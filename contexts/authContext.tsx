import { auth } from "@/config/firebase";
import { UserService } from "@/services/userService";
import { AuthContextType, UserType } from "@/types/types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Firebase Auth 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('Auth state changed:', !!firebaseUser);
      
      if (firebaseUser) {
        console.log('✅ 로그인된 사용자:', firebaseUser.email);
        console.log('✅ 사용자 이름:', firebaseUser.displayName);
        
        // 기본 사용자 정보 설정
        const basicUserData = {
          uid: firebaseUser.uid,
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          image: null
        };
        
        // Firestore에서 프로필 로드 시도
        try {
          const profile = await UserService.getUserProfile(firebaseUser.uid);
          if (profile) {
            console.log('📊 사용자 프로필 로드 완료:', {
              level: profile.level,
              cash: profile.cash,
              totalAssets: profile.totalAssets
            });
            
            // 마지막 로그인 시간 업데이트
            await UserService.updateLastLogin(firebaseUser.uid);
            
            setUser({
              ...basicUserData,
              profile
            });
          } else {
            console.log('⚠️ 프로필이 없음 - 프로필 생성 시도');
            
            // 프로필이 없으면 자동으로 생성
            const profileCreated = await UserService.createUserProfile(firebaseUser.uid, {
              name: firebaseUser.displayName || '사용자',
              email: firebaseUser.email || ''
            });
            
            if (profileCreated) {
              console.log('✅ 프로필 자동 생성 완료');
              const newProfile = await UserService.getUserProfile(firebaseUser.uid);
              if (newProfile) {
                setUser({
                  ...basicUserData,
                  profile: newProfile
                });
              } else {
                setUser(basicUserData);
              }
            } else {
              console.log('❌ 프로필 자동 생성 실패 - 기본 사용자 정보만 사용');
              setUser(basicUserData);
            }
          }
        } catch (error) {
          console.error('❌ 프로필 로드 실패:', error);
          setUser(basicUserData);
        }
      } else {
        console.log('❌ 로그아웃됨');
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      console.log('로그인 시도:', email);
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      console.error('로그인 실패:', error);
      let msg = "로그인에 실패했습니다.";
      
      if (error.code === 'auth/user-not-found') {
        msg = "등록되지 않은 이메일입니다.";
      } else if (error.code === 'auth/wrong-password') {
        msg = "잘못된 비밀번호입니다.";
      } else if (error.code === 'auth/invalid-email') {
        msg = "유효하지 않은 이메일 형식입니다.";
      }
      
      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      console.log('회원가입 시도:', email, '이름:', name);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 이름이 제공된 경우 Firebase 프로필에 저장
      if (name && userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
        console.log('✅ 사용자 이름 업데이트 완료:', name);
      }

      // Firestore에 사용자 프로필 생성 (재시도 로직 추가)
      // 인증 토큰이 완전히 준비될 때까지 잠시 대기
      await new Promise(resolve => setTimeout(resolve, 1000));

      let profileCreated = false;
      let retryCount = 0;
      const maxRetries = 3;

      while (!profileCreated && retryCount < maxRetries) {
        try {
          profileCreated = await UserService.createUserProfile(userCredential.user.uid, {
            name: name || '',
            email: email
          });
          
          if (!profileCreated) {
            retryCount++;
            if (retryCount < maxRetries) {
              console.log(`⚠️ 프로필 생성 실패 - 재시도 ${retryCount}/${maxRetries}`);
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }
        } catch (error) {
          retryCount++;
          console.error(`❌ 프로필 생성 시도 ${retryCount} 실패:`, error);
          if (retryCount < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
      }

      if (profileCreated) {
        console.log('✅ 사용자 프로필 생성 완료 - 초기 자산: 1000만원');
      } else {
        console.log('⚠️ 프로필 생성 실패 - 인증은 성공 (나중에 자동 생성됨)');
      }
      
      return { success: true };
    } catch (error: any) {
      console.error('회원가입 실패:', error);
      let msg = "회원가입에 실패했습니다.";
      
      if (error.code === 'auth/email-already-in-use') {
        msg = "이미 사용 중인 이메일입니다.";
      } else if (error.code === 'auth/invalid-email') {
        msg = "유효하지 않은 이메일 형식입니다.";
      } else if (error.code === 'auth/weak-password') {
        msg = "비밀번호가 너무 약습니다.";
      }
      
      return { success: false, msg };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      console.error('로그아웃 실패:', error);
      return { success: false, msg: "로그아웃에 실패했습니다." };
    }
  };

  const updateUserData = async () => {
    // 현재 사용자의 프로필 새로고침
    if (user?.uid) {
      try {
        const profile = await UserService.getUserProfile(user.uid);
        if (profile) {
          setUser({
            ...user,
            profile
          });
          console.log('✅ 사용자 데이터 새로고침 완료');
        }
      } catch (error) {
        console.error('❌ 사용자 데이터 새로고침 실패:', error);
      }
    }
  };
  const refreshUserData = async () => {
  if (!user?.uid) return;
  
  setIsLoading(true);
  try {
    console.log('🔄 사용자 데이터 새로고침 시작...');
    const profile = await UserService.getUserProfile(user.uid);
    
    if (profile) {
      setUser(prevUser => ({
        ...prevUser!,
        profile: profile
      }));
      console.log('✅ 사용자 데이터 새로고침 완료');
    }
  } catch (error) {
    console.log('❌ 사용자 데이터 새로고침 실패:', error);
  } finally {
    setIsLoading(false);
  }
};

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    logout,
    updateUserData,
    isLoading,
    refreshUserData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

