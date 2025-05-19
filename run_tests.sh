#!/bin/bash

# OS 확인
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows 환경
    HOSTS_FILE="C:/Windows/System32/drivers/etc/hosts"
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
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows 환경
    powershell -Command "Copy-Item -Path '$HOSTS_FILE' -Destination '${HOSTS_FILE}.backup' -Force"
else
    cp "$HOSTS_FILE" "$HOSTS_FILE.backup"
fi

# 테스트할 IP 주소 배열
ips=("210.96.164.68" "210.96.164.74" "210.96.164.102")

# 각 IP에 대해 테스트 실행
for i in "${!ips[@]}"; do
    current_index=$((i+1))
    echo "테스트 IP ${ips[$i]} (${current_index}/${#ips[@]})"
    
    # hosts 파일 수정
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # Windows 환경
        # 기존 securities.koreainvestment.com 라인 제거 및 새로운 IP 추가
        powershell -Command "
            \$content = Get-Content '$HOSTS_FILE' -Raw
            \$content = \$content -replace '.*securities\.koreainvestment\.com.*', ''
            \$content = \$content.TrimEnd() + \"`n${ips[$i]} securities.koreainvestment.com`n\"
            Set-Content -Path '$HOSTS_FILE' -Value \$content -Force
        "
    else
        # Unix/Linux/Mac 환경
        sed -i.bak "/securities.koreainvestment.com/d" "$HOSTS_FILE"
        echo "${ips[$i]} securities.koreainvestment.com" >> "$HOSTS_FILE"
    fi
    
    # Cypress 실행 (윈도우 모드)
    IP_INDEX=$current_index npx cypress run --spec "cypress/e2e/spec.cy.js" --browser chrome --headed &
    CYPRESS_PID=$!
    
    # Cypress UI가 로드될 때까지 대기
    sleep 5
    
    # 테스트 완료 대기
    while [ ! -f "cypress/fixtures/test_completed" ]; do
        sleep 1
    done
    
    # Cypress 프로세스 종료
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
        # Windows 환경
        taskkill /F /PID $CYPRESS_PID
        taskkill /F /IM cypress.exe
    else
        # Unix/Linux/Mac 환경
        kill -15 $CYPRESS_PID 2>/dev/null || true
        pkill -f "cypress" || true
    fi
    
    # 프로세스가 완전히 종료될 때까지 대기
    while true; do
        if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            # Windows 환경
            if ! tasklist | findstr "cypress.exe" > /dev/null; then
                break
            fi
        else
            # Unix/Linux/Mac 환경
            if ! pgrep -f "cypress" > /dev/null; then
                break
            fi
        fi
        sleep 1
    done
    
    # 테스트 완료 파일 삭제
    rm -f cypress/fixtures/test_completed
    
    # 다음 테스트 전 잠시 대기
    sleep 2
done

# hosts 파일 복원
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows 환경
    powershell -Command "Copy-Item -Path '${HOSTS_FILE}.backup' -Destination '$HOSTS_FILE' -Force; Remove-Item '${HOSTS_FILE}.backup' -Force"
else
    cp "${HOSTS_FILE}.backup" "$HOSTS_FILE"
    rm "${HOSTS_FILE}.backup"
fi

echo "모든 테스트가 완료되었습니다." 