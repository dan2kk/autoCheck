#!/bin/bash

# 운영체제 확인
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    # Windows의 경우 관리자 권한으로 실행 중인지 확인
    net session >/dev/null 2>&1
    if [ $? -ne 0 ]; then
        echo "이 스크립트는 관리자 권한으로 실행해야 합니다."
        exit 1
    fi
else
    # Unix 계열의 경우 sudo 권한으로 실행 중인지 확인
    if [ "$EUID" -ne 0 ]; then 
        echo "이 스크립트는 sudo 권한으로 실행해야 합니다."
        exit 1
    fi
fi

# hosts 파일 백업
echo "hosts 파일을 백업합니다..."
cp /etc/hosts /etc/hosts.backup

# IP 주소 배열 정의
declare -a ips=("210.96.164.68" "210.96.164.74" "210.96.164.102")  # 테스트할 IP 주소들을 여기에 추가

# 각 IP에 대해 테스트 실행
for i in "${!ips[@]}"; do
    current_index=$((i+1))
    echo "테스트 IP ${ips[$i]} (${current_index}/${#ips[@]})"
    
    # hosts 파일 수정
    echo "127.0.0.1 localhost" > /etc/hosts
    echo "${ips[$i]} securities.koreainvestment.com" >> /etc/hosts
    
    # 시그널 파일 삭제 (이전 테스트의 잔여물 제거)
    rm -f cypress/fixtures/test_completed
    
    # Cypress를 창 모드로 실행
    IP_INDEX=$current_index npx cypress open --config-file cypress.config.js &
    CYPRESS_PID=$!
    
    # 시그널 파일이 생성될 때까지 대기
    while [ ! -f cypress/fixtures/test_completed ]; do
        sleep 1
    done
    
    # Cypress 프로세스 종료
    kill $CYPRESS_PID
    
    # 시그널 파일 삭제
    rm -f cypress/fixtures/test_completed
    
    echo "테스트가 완료되었습니다. 다음 IP로 진행합니다..."
done

# 테스트 완료 후 원래 hosts 파일로 복구
echo "모든 테스트가 완료되었습니다. hosts 파일을 원래대로 복구합니다."
cp /etc/hosts.backup /etc/hosts
rm /etc/hosts.backup 