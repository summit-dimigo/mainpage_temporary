// 주식 보유 정보
export interface StockHolding {
  symbol: string;        // 주식 코드 (예: "AAPL", "TSLA")
  name: string;          // 주식 이름
  quantity: number;      // 보유 수량
  averagePrice: number;  // 평균 매입가
  currentPrice: number;  // 현재가
  totalValue: number;    // 총 평가액 (quantity * currentPrice)
}

// 사용자 프로필 데이터
export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  // 게임 데이터
  level: number;         // 사용자 레벨 (1~10)
  experience: number;    // 경험치
  // 자산 관리
  cash: number;          // 현금 (기본 1000만원)
  stockHoldings: StockHolding[]; // 보유 주식 목록
  totalAssets: number;   // 총 자산 (현금 + 주식 평가액)
  // 게임 통계
  totalTrades: number;   // 총 거래 횟수
  profitLoss: number;    // 총 손익
  winRate: number;       // 승률 (%)
  // 메타데이터
  createdAt: Date;       // 계정 생성일
  lastLoginAt: Date;     // 마지막 로그인
  updatedAt: Date;       // 마지막 업데이트
}

export type UserType = {
  uid?: string;
  email?: string | null;
  name: string | null;
  image?: any;
  profile?: UserProfile; // Firestore 프로필 데이터
} | null;

export type AuthContextType = {
  user: UserType;
  setUser: Function;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; msg?: string }>;
  register: (
    email: string,
    password: string,
    name?: string
  ) => Promise<{ success: boolean; msg?: string }>;
  logout: () => Promise<{ success: boolean; msg?: string }>;
  updateUserData: () => Promise<void>;
  isLoading: boolean;
  refreshUserData: () => Promise<void>; // 새로 추가
};

export type ResponseType = {
  success: boolean;
  data?: any;
  msg?: string;
};
