import { db } from "@/config/firebase";
import { StockHolding, UserProfile } from "@/types/types";
import { logger } from "@/utils/logger";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";

export class UserService {
  // 사용자 프로필 생성 (회원가입 시)
  static async createUserProfile(uid: string, userData: { name: string; email: string }): Promise<boolean> {
    try {
      logger.info('사용자 프로필 생성 중...', uid);
      
      // 디버깅: 인증 상태 확인
      const { auth } = await import("@/config/firebase");
      const currentUser = auth.currentUser;
      logger.debug('현재 인증된 사용자:', currentUser?.uid);
      logger.debug('요청된 UID:', uid);
      
      if (!currentUser) {
        logger.error('사용자가 인증되지 않았습니다');
        return false;
      }
      
      if (currentUser.uid !== uid) {
        logger.error('인증된 사용자 UID와 요청 UID가 일치하지 않습니다');
        return false;
      }
      
      const userProfile: Omit<UserProfile, 'uid' | 'createdAt' | 'lastLoginAt' | 'updatedAt'> = {
        name: userData.name,
        email: userData.email,
        // 게임 초기값
        level: 1,
        experience: 0,
        // 초기 자산 (1000만원)
        cash: 10000000,
        stockHoldings: [],
        totalAssets: 10000000,
        // 게임 통계 초기값
        totalTrades: 0,
        profitLoss: 0,
        winRate: 0,
      };

      await setDoc(doc(db, 'users', uid), {
        ...userProfile,
        uid,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      logger.info('사용자 프로필 생성 완료');
      return true;
    } catch (error) {
      logger.error('사용자 프로필 생성 실패:', error);
      return false;
    }
  }

  // 사용자 프로필 조회
  static async getUserProfile(uid: string): Promise<UserProfile | null> {
    try {
      logger.debug('사용자 프로필 조회 중...', uid);
      
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        logger.debug('사용자 프로필 조회 완료');
        return {
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          lastLoginAt: data.lastLoginAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as UserProfile;
      } else {
        logger.warn('사용자 프로필을 찾을 수 없음');
        return null;
      }
    } catch (error) {
      logger.error('사용자 프로필 조회 실패:', error);
      return null;
    }
  }

  // 현금 업데이트
  static async updateCash(uid: string, newCashAmount: number): Promise<boolean> {
    try {
      if (newCashAmount < 0) {
        logger.warn('현금이 음수가 될 수 없습니다:', newCashAmount);
        return false;
      }

      logger.debug('현금 업데이트 중...', uid, newCashAmount);
      
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        cash: newCashAmount,
        updatedAt: serverTimestamp(),
      });

      logger.debug('현금 업데이트 완료');
      return true;
    } catch (error) {
      logger.error('현금 업데이트 실패:', error);
      return false;
    }
  }

  // 주식 보유량 업데이트
  static async updateStockHoldings(uid: string, stockHoldings: StockHolding[]): Promise<boolean> {
    try {
      console.log('📈 주식 보유량 업데이트 중...', uid);
      
      // 총 자산 계산 (현금 + 주식 평가액)
      const stockValue = stockHoldings.reduce((total, stock) => total + stock.totalValue, 0);
      
      // 현재 현금 조회
      const profile = await this.getUserProfile(uid);
      if (!profile) return false;
      
      const totalAssets = profile.cash + stockValue;

      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        stockHoldings,
        totalAssets,
        updatedAt: serverTimestamp(),
      });

      console.log('✅ 주식 보유량 업데이트 완료');
      return true;
    } catch (error) {
      console.error('❌ 주식 보유량 업데이트 실패:', error);
      return false;
    }
  }

  // 거래 기록 업데이트 (거래 횟수, 손익 등)
  static async updateTradeStats(uid: string, profit: number): Promise<boolean> {
    try {
      console.log('📊 거래 통계 업데이트 중...', uid, profit);
      
      const profile = await this.getUserProfile(uid);
      if (!profile) return false;

      const newTotalTrades = profile.totalTrades + 1;
      const newProfitLoss = profile.profitLoss + profit;
      
      // 승률 계산 (간단히 수익이 0보다 크면 승리로 간주)
      const wins = profit > 0 ? 1 : 0;
      const currentWins = Math.round((profile.winRate / 100) * profile.totalTrades);
      const newWinRate = ((currentWins + wins) / newTotalTrades) * 100;

      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        totalTrades: newTotalTrades,
        profitLoss: newProfitLoss,
        winRate: newWinRate,
        updatedAt: serverTimestamp(),
      });

      console.log('✅ 거래 통계 업데이트 완료');
      return true;
    } catch (error) {
      console.error('❌ 거래 통계 업데이트 실패:', error);
      return false;
    }
  }

  // 레벨 업데이트
  static async updateLevel(uid: string, newLevel: number, newExperience: number): Promise<boolean> {
    try {
      console.log('🆙 레벨 업데이트 중...', uid, newLevel, newExperience);
      
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        level: newLevel,
        experience: newExperience,
        updatedAt: serverTimestamp(),
      });

      console.log('✅ 레벨 업데이트 완료');
      return true;
    } catch (error) {
      console.error('❌ 레벨 업데이트 실패:', error);
      return false;
    }
  }

  // 마지막 로그인 시간 업데이트
  static async updateLastLogin(uid: string): Promise<boolean> {
    try {
      const userDocRef = doc(db, 'users', uid);
      await updateDoc(userDocRef, {
        lastLoginAt: serverTimestamp(),
      });
      return true;
    } catch (error) {
      console.error('❌ 마지막 로그인 업데이트 실패:', error);
      return false;
    }
  }
}
