# 아침점검 Description

https://candy-feta-cc6.notion.site/E2E-test-f88fc498dd434b1dbae0f9e11a0fd9e8?pvs=4


# 아침점검 고도화

## 실행 방법

### 사전 준비

1. `npm i -g cypress` 로 cypress 설치하기
2. [https://github.com/dan2kk/autoCheck](https://github.com/dan2kk/autoCheck) 해당 repo clone
3. 윈도우의 경우 해당 커맨드 입력 필수

```powershell
### 스크립트 실행 정책 변경 ###
1. 관리자 권한으로 PowerShell 실행
 
2. Set-ExecutionPolicy RemoteSigned
```

### 실행 방법

Mac의 경우: `sudo ./run_tests.sh`

윈도우의 경우: 관리자 권한으로 powershell 실행 → `./run_tests.ps1`

(hosts 파일 수정을 위해 관리자 권한 필요)
