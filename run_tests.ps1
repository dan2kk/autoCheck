# 관리자 권한 확인
if (-NOT ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
    Write-Warning "이 스크립트는 관리자 권한으로 실행해야 합니다."
    Write-Warning "PowerShell을 관리자 권한으로 실행한 후 다시 시도해주세요."
    exit 1
}

# hosts 파일 경로 설정
$HOSTS_FILE = "C:\Windows\System32\drivers\etc\hosts"

# hosts 파일 백업
Copy-Item -Path $HOSTS_FILE -Destination "$HOSTS_FILE.backup" -Force

# 테스트할 IP 주소 배열
$ips = @("210.96.164.68", "210.96.164.74", "210.96.164.102")

# 각 IP에 대해 테스트 실행
for ($i = 0; $i -lt $ips.Count; $i++) {
    $current_index = $i + 1
    Write-Host "테스트 IP $($ips[$i]) ($current_index/$($ips.Count))"
    
    # hosts 파일 수정
    $content = Get-Content $HOSTS_FILE -Raw
    $content = $content -replace '.*securities\.koreainvestment\.com.*', ''
    $content = $content.TrimEnd() + "`n$($ips[$i]) securities.koreainvestment.com`n"
    Set-Content -Path $HOSTS_FILE -Value $content -Force
    
    # Cypress 실행 (윈도우 모드)
    $env:IP_INDEX = $current_index
    Start-Process -NoNewWindow -FilePath "npx" -ArgumentList "cypress run --spec `"cypress/e2e/spec.cy.js`" --browser chrome --headed"
    $CYPRESS_PID = $LASTEXITCODE
    
    # Cypress UI가 로드될 때까지 대기
    Start-Sleep -Seconds 5
    
    # 테스트 완료 대기
    while (-not (Test-Path "cypress/fixtures/test_completed")) {
        Start-Sleep -Seconds 1
    }
    
    # Cypress 프로세스 종료
    Stop-Process -Id $CYPRESS_PID -Force -ErrorAction SilentlyContinue
    Get-Process | Where-Object { $_.ProcessName -like "*cypress*" } | Stop-Process -Force
    
    # 프로세스가 완전히 종료될 때까지 대기
    while (Get-Process | Where-Object { $_.ProcessName -like "*cypress*" }) {
        Start-Sleep -Seconds 1
    }
    
    # 테스트 완료 파일 삭제
    Remove-Item -Path "cypress/fixtures/test_completed" -Force -ErrorAction SilentlyContinue
    
    # 다음 테스트 전 잠시 대기
    Start-Sleep -Seconds 2
}

# hosts 파일 복원
Copy-Item -Path "$HOSTS_FILE.backup" -Destination $HOSTS_FILE -Force
Remove-Item -Path "$HOSTS_FILE.backup" -Force

Write-Host "모든 테스트가 완료되었습니다." 