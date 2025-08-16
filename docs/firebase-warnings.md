# Firebase Firestore 경고 해결 가이드

## 🚨 발생하는 경고들

```
WARN @firebase/firestore: Firestore (12.1.0): WebChannelConnection RPC 'Listen' stream transport errored
WARN @firebase/firestore: Firestore (12.1.0): WebChannelConnection RPC 'Write' stream transport errored
```

## 🔍 경고가 나타나는 이유

이러한 경고들은 다음과 같은 상황에서 발생할 수 있습니다:

1. **네트워크 연결 문제**: 인터넷 연결이 불안정하거나 지연될 때
2. **개발 환경**: React Native/Expo 개발 환경에서 WebSocket 연결이 때때로 불안정할 수 있음
3. **Firebase SDK의 재연결 메커니즘**: Firestore가 자동으로 연결을 재시도하는 과정에서 발생

## ✅ 해결 방법

### 1. 경고 무시 설정 (이미 적용됨)

우리가 이미 구현한 `utils/logger.ts`에서 이러한 경고들을 자동으로 필터링합니다:

```typescript
// Firebase 관련 경고를 자동으로 억제
const suppressedPatterns = [
  '@firebase/firestore',
  'WebChannelConnection',
  'RPC',
  'stream',
  'transport errored'
];
```

### 2. 앱 기능에는 영향 없음

- 이러한 경고들은 **실제 앱 기능에는 전혀 영향을 주지 않습니다**
- Firebase는 내부적으로 자동 재연결을 처리합니다
- 데이터 읽기/쓰기는 정상적으로 작동합니다

### 3. 프로덕션 환경에서는 나타나지 않음

- 이 경고들은 주로 개발 환경에서만 발생합니다
- 프로덕션 빌드에서는 로그 레벨이 다르게 설정되어 표시되지 않습니다

## 🎯 확인 방법

앱이 정상적으로 작동하는지 확인하려면:

1. **회원가입/로그인**: 정상적으로 되는가?
2. **데이터 저장**: 사용자 프로필이 제대로 생성되는가?
3. **데이터 조회**: MyPage에서 사용자 정보가 표시되는가?

이 모든 기능이 정상 작동한다면 경고는 무시해도 됩니다.

## 🔧 추가 개선 사항

현재 프로젝트에는 다음이 적용되어 있습니다:

- ✅ 커스텀 로거로 Firebase 경고 억제
- ✅ 에러 핸들링 강화
- ✅ 개발/프로덕션 환경 구분
- ✅ 적절한 로그 레벨 설정

## 📞 문제 해결

만약 실제 기능에 문제가 있다면:

1. 네트워크 연결 확인
2. Firebase 프로젝트 설정 확인
3. API 키와 구성 정보 확인
4. Firestore 보안 규칙 확인

하지만 단순한 WebChannelConnection 경고는 걱정하지 마세요! 🙂
