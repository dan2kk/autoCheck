#!/bin/bash

# OS 확인
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows 환경
    HOSTS_FILE="/c/Windows/System32/drivers/etc/hosts"
    # 관리자 권한으로 실행 확인
    if ! net session >/dev/null 2>&1; then
        echo "이 스크립트는 관리자 권한으로 실행해야 합니다."
        echo "PowerShell을 관리자 권한으로 실행한 후 다시 시도해주세요."
        exit 1
    fi
else
    # Unix/Linux/Mac 환경
    HOSTS_FILE="/etc/hosts"
    # sudo 권한 확인
    if [ "$EUID" -ne 0 ]; then
        echo "이 스크립트는 sudo 권한으로 실행해야 합니다."
        exit 1
    fi
fi

# hosts 파일 백업
cp "$HOSTS_FILE" "${HOSTS_FILE}.backup"

# 테스트할 IP 주소 배열
ips=("210.96.164.68" "210.96.164.74" "210.96.164.75")

# 각 IP에 대해 테스트 실행
for i in "${!ips[@]}"; do
    current_index=$((i+1))
    echo "테스트 IP ${ips[$i]} (${current_index}/${#ips[@]})"
    
    # hosts 파일 수정
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # Windows 환경
        # 기존 securities.koreainvestment.com 라인 제거
        powershell -Command "(Get-Content $HOSTS_FILE) -replace '.*securities\.koreainvestment\.com.*', '' | Set-Content $HOSTS_FILE"
        # 새로운 IP 추가
        echo "${ips[$i]} securities.koreainvestment.com" >> "$HOSTS_FILE"
    else
        # Unix/Linux/Mac 환경
        sed -i.bak "/securities.koreainvestment.com/d" "$HOSTS_FILE"
        echo "${ips[$i]} securities.koreainvestment.com" >> "$HOSTS_FILE"
    fi
    
    # Cypress 실행 (윈도우 모드)
    IP_INDEX=$current_index npx cypress open --config-file cypress.config.js &
    CYPRESS_PID=$!
    
    # 테스트 완료 대기
    while [ ! -f "cypress/fixtures/test_completed" ]; do
        sleep 1
    done
    
    # Cypress 프로세스 종료
    kill $CYPRESS_PID
    
    # 테스트 완료 파일 삭제
    rm -f cypress/fixtures/test_completed
    
    # 다음 IP로 넘어가기 전에 사용자 입력 대기
    read -p "다음 IP로 넘어가려면 Enter를 누르세요..."
done

# hosts 파일 복원
cp "${HOSTS_FILE}.backup" "$HOSTS_FILE"
rm "${HOSTS_FILE}.backup"

echo "모든 테스트가 완료되었습니다." 