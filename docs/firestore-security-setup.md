# 🔐 Firebase Firestore 보안 규칙 설정 가이드

## 문제 상황
```
ERROR 🔴 사용자 프로필 생성 실패: [FirebaseError: Missing or insufficient permissions.]
```

이 오류는 Firestore 데이터베이스에 보안 규칙이 제대로 설정되지 않아서 발생합니다.

## 📋 해결 단계

### 1. Firebase Console 접속
1. [Firebase Console](https://console.firebase.google.com/) 에 접속
2. 프로젝트 `mypage-627c4` 선택
3. 왼쪽 메뉴에서 **Firestore Database** 클릭

### 2. 보안 규칙 설정
1. **Rules** 탭 클릭
2. 기존 규칙을 모두 삭제
3. 아래 규칙 중 하나를 복사하여 붙여넣기

#### 옵션 A: 간단한 규칙 (즉시 테스트용)
```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

#### 옵션 B: 상세한 규칙 (프로덕션 권장)
```javascript
// firestore.rules 파일의 전체 내용을 복사
```

### 3. 규칙 게시
1. **게시(Publish)** 버튼 클릭
2. 확인 창에서 **게시** 클릭

## 🚀 즉시 테스트하기

규칙을 설정한 후:

1. 앱을 새로고침 (Expo에서 `r` 키)
2. 회원가입 또는 로그인 시도
3. 정상적으로 프로필이 생성되는지 확인

## 🔍 규칙 설명

### 기본 원칙
- **인증된 사용자만** 접근 가능
- **자신의 데이터만** 읽기/쓰기 가능
- **다른 사용자의 데이터**는 접근 불가

### 보안 수준
```javascript
request.auth != null && request.auth.uid == userId
```
- `request.auth != null`: 사용자가 로그인되어 있어야 함
- `request.auth.uid == userId`: 요청한 사용자 ID와 문서 ID가 일치해야 함

## ⚠️ 주의사항

### 개발 중
- 간단한 규칙으로 시작해서 빠르게 테스트
- 기능이 정상 작동하는지 확인

### 프로덕션
- 상세한 유효성 검사 규칙 적용
- 데이터 타입과 범위 검증 추가

## 🛠️ 문제 해결

### 규칙이 적용되지 않는 경우
1. Firebase Console에서 **게시** 버튼을 눌렀는지 확인
2. 프로젝트 ID가 올바른지 확인
3. 앱을 완전히 새로고침

### 여전히 권한 오류가 나는 경우
1. 사용자가 정상적으로 로그인되었는지 확인
2. `auth.currentUser`가 null이 아닌지 확인
3. Firebase Auth가 제대로 초기화되었는지 확인

## ✅ 성공 확인

다음이 모두 작동하면 성공:
- ✅ 회원가입 시 프로필 생성
- ✅ 로그인 시 프로필 로드
- ✅ 게임 데이터 업데이트
- ✅ MyPage에서 데이터 표시

이제 Firebase 권한 오류 없이 앱을 사용할 수 있습니다! 🎉
