//TODO: 추후에 모듈화를 해야할듯
let resultFilePath = './cypress/fixtures/testresult.json'
const ipIndex = Cypress.env('ipIndex') || '1'; // IP 인덱스 정보 가져오기

describe(`홈페이지 아침점검 v6.0 (${ipIndex}호기)`, () => {
  before(() => {
    // IP 인덱스 로깅
    cy.log(`현재 테스트 중인 IP 인덱스: ${ipIndex}호기`)
    
    //지수 데이터 받아오는 http 요청 확인
    cy.intercept('POST', '/Flash_Data/jisuData.json*', (req) =>{}).as('jisuData');
    //Google Analyistc 무시
    cy.intercept('https://www.google-analytics.com/g/collect**', (req) => {
      req.reply(204);
    }).as('gaRequest');
    //fe_loading 처리
    parent.fe_loading = function(){
      return true;
    }
    //KOS alert 무시
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('KOS is not defined')) {
        return false;
      }
      return true;
    });
  });
  afterEach(() => {
    // 테스트 이름과 결과 출력
    let testName = Cypress.currentTest.title; // 현재 테스트 이름
    let testState = Cypress.mocha.getRunner().suite.ctx.currentTest.state; // 현재 테스트 상태 (passed, failed 등)
    
    // 결과 파일 읽기
    cy.task('readFileMaybe', resultFilePath).then((existingResults) => {
      let testResult = JSON.parse(existingResults) || {"properties1":[]}; // 기존 결과가 없으면 빈 객체로 초기화
      if (testState !== 'passed') {
        let fileName = `${testName}_${ipIndex}호기_${Date.now()}`;
        cy.screenshot(fileName);
      }
      testResult["properties1"].push({ "title": `${testName} (${ipIndex}호기)`, "value": testState});

      // 결과 파일에 새로운 결과 저장
      cy.writeFile(resultFilePath, testResult, { flag: 'w' }); // 기존 내용을 덮어씌움
  })
});
  after(()=>{
    cy.task('readFileMaybe', resultFilePath).then((existingResults) => {
      let testResult = JSON.parse(existingResults) || {}; // 기존 결과가 없으면 빈 객체로 초기화
      let testWhole = true;
      for(let x of testResult["properties1"]){
        if(x["value"] !== 'passed'){
          testWhole = false;
          break;
        }
      }
      testResult["result"] = (testWhole) ? '정상' : '오류';
      testResult["created"] = new Date().toLocaleString('ko-KR').replace(/\s+/g, ' ').trim();
      cy.writeFile(resultFilePath, testResult, { flag: 'w' }); // 기존 내용을 덮어씌움
      console.log(testResult);
    })
    cy.fixture('testresult.json').then((file)=>{
      cy.request({
        method: 'POST',
        url: 'https://prod-09.southeastasia.logic.azure.com:443/workflows/c7d2825bc6c1459096cff04cb05a4042/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mLWRZJqBr1SmxidYgsJlf3oz4ebXRx7qzLpSE8wyOBU',
        headers: {
          'Content-Type': 'application/json'
        },
        body: file,
      }).then((response)=>{
        expect(response.status).to.eq(202);
      })
    })
    cy.task('deleteFile', resultFilePath);
  })
  context('로그인 영역', () =>{
    before(()=>{
      //login 처리
      Cypress.config('baseUrl', 'https://securities.koreainvestment.com');
      cy.visit('/main/member/login/login.jsp').then(() =>{
        cy.url().then((currentUrl) => {
          if (!currentUrl.includes('/main/Main.jsp')) { //기 로그인이 되어 있을 경우, skip 처리
            cy.get('canvas', {timeout: 100000}).then((canvas) => {
              if(canvas == null){
                cy.get('#browerCert', { timeout: 100000 }).should('be.visible').and('not.be.disabled');
                cy.wait(10000);
                cy.get('[data-tab="phone"] > a').click({ force: true });
              }
            })
            cy.get('canvas', { timeout: 100000 }).should('be.visible').then(($canvas) => {
              const context = $canvas[0].getContext('2d');
              if (context) {
                cy.get('#content').scrollTo(0, 200, {ensureScrollable: false});
                alert('---로그인 해주세요!!!!---');
                cy.get('#loginInfo > .modal_dialog > .modal_content > .btn_close', {timeout: 100000}).click();
              }
          });
          }
        });
      });
    });
    context('이체 실행', () => {
      it('이체 화면 검사', () =>{
        cy.visit('/main/banking/opentransfer/NTransfer.jsp').then(() =>{
          alert('30분 내 이체 과정을 진행해주세요');
        });
        cy.get('.result_box', {timeout:180000}).should('be.visible');
      })
    })
    context('트레이딩 메뉴 검사', () => {
      it('주식주문 화면 검사', () =>{
        cy.visit('/main/bond/deal/StockDeal.jsp');
        cy.get('#mItemCode').eq(0).type('005930{enter}');
        cy.get('#stockName_1').should('have.value', '삼성전자');
      })
      it('주식주문 화면 검사', () =>{
        cy.visit('/main/bond/deal/StockDeal.jsp').then((window)=>{
          window.fn_openCompPop();
        });
        cy.get('#mItemCode').eq(0).type('005930{enter}');
        cy.get('#stockName_1').should('have.value', '삼성전자');
      })
      it('주식체결 화면 검사', () =>{
        //ctsArea 에러 해결
        Cypress.on('uncaught:exception', (err, runnable) => {
          if (err.message.includes("undefined (reading 'ctsArea')")) {
            return false;
          }
          return true;
        });
        cy.visit('/main/bond/deal/StockDeal.jsp').then((window) =>{
          var spy = cy.spy(window, 'fn_accNoCheck').as('passwordCheck');
          alert('계좌 선택후 비밀번호 입력해 주세요(자동으로 20230929부터 거래기록 탐색)');
          cy.get('@passwordCheck', {timeout: 100000}).should('have.been.called').then(()=>{
            cy.get('.tabType1 > :nth-child(4) > a').click().then(() =>{
              cy.get('#fromDate').invoke('val', '2023.09.29');
              cy.get('.marT20 > .btnArea > .btn_Blue').click();
              cy.get('#Head_yes1_12').find('tbody').find('tr').its('length').then((rowCount) => {
                if(rowCount == 1){
                  return;
                }
                else{
                  cy.get('#Head_yes1_12').find('tbody').find('tr').each((element, index) => {
                    if(index >= 10) return;
                    cy.wrap(element).within(() => {
                      const ele = Cypress.$(element).find('td').map((i, td) => Cypress.$(td).text().trim()).get();
                      // 짝수 줄 (첫 번째 줄)
                      if (index % 2 === 0) {
                        expect(ele[1]).to.match(/^\d{1,11}$/); // 주문번호
                        expect(ele[5]).to.match(/^\d{1,3}(,\d{3})*$/); // 체결평균가
                        expect(ele[8]).to.match(/\d{4}\.\d{2}\.\d{2}/); // 주문일
                      } else { // 홀수 줄 (두 번째 줄)
                        // expect(ele[0]).to.match(/^\d{5,6}$/); // 주문번호
                        // expect(ele[4]).to.match(/^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/); // 체결평균가
                        // expect(ele[6]).to.match(/\d{4}\.\d{2}\.\d{2}/); // 주문일
                      }
                    });
                  });
                }
              });
            });
          });
        });
      })
    });
    context('오픈뱅킹 테스트', () => {
      it('오픈뱅킹 가져오기 검사', () =>{
        cy.visit('/main/banking/openBanking/ImportMyAcc.jsp').then((window) => {
          cy.url().then((url) => {
            if (url.includes('/main/banking/openBanking/OpenBankingServiceApply.jsp')) {
              cy.log('오픈뱅킹 신청 페이지')
            }
            else{
              cy.spy(window, 'fn_first').as('accountCheck');
              cy.get('#ACC_NO').select(1, { force: true });
              cy.get('@accountCheck', {timeout: 100000}).should('have.been.called').then(()=>{
                cy.get('#IBCOM_S_O_PAYMENT').invoke('val').should('include', '출금가능금액 :');
                cy.get('#DNCL_AMT').invoke('val').should('include', '예수금 : ');
                cy.get('#CMA_EVLU_AMT').invoke('val').should('include', 'CMA :');
            });
            }
          })
        });
      })
    })
    context('펀드 보유화면 테스트', () =>{
      it('펀드 추가매수 테스트', () =>{
        cy.visit('/main/mall/openptrade/FundTrade03.jsp');
        cy.get('.tbl-data').find('tbody').find('tr').its('length').then((rowCount) => {
          if(rowCount == 0){
            return;
          }
          else{
            cy.get('.tbl-data').find('tbody').find('tr').each((element, index) => {
              if(index >= 10) return;
              cy.wrap(element).within(() => {
                const ele = Cypress.$(element).find('td').map((i, td) => Cypress.$(td).text().trim()).get();
                console.log(ele);
                expect(ele[0]).to.match(/^\d{8}-\d{2}-\d{4}$/); // 계좌번호
                expect(ele[2]).to.match(/^\d{1,3}(,\d{3})* 원$/);
                expect(ele[3]).to.match(/^\d{1,3}(,\d{3})* 좌$/);
              });
            });
          }
        });
      });
    });
    context('나의 자산 검사', () =>{
      it('나의자산 메뉴 확인', ()=>{
        cy.visit('/main/myAsset/myAsset.jsp', {headers: {
          'Accept-Language': 'ko-KR',
          }})
        //나의 자산 상단
        cy.get('#totalMoney').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 총액
        cy.get('#yesuCMA').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 예수금
        cy.get('#possibleMountInquiry').click() // 출금 가능금액 조회 버튼 클릭 
        cy.get('#possibleAmount', {timeout: 5000}).invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 출금 가능 금액

        //상품유형별 현황
        for(let i=1; i<=6; i++){
          if(i <=4){
            cy.get('#mesu'+i).invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 매수금액
            cy.get('#amount'+i).invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 평가금액
            cy.get('#pfls_amt'+i).invoke('text').should('match', /^-?(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 손익금액
            cy.get('#erng_rt'+i).invoke('text').should('match', /^-?\d+(\.\d+)?%$/) // 보유비중
          }
          else{
            cy.get('#mesu'+i+i).invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 매수금액
            cy.get('#amount'+i+i).invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 평가금액
            cy.get('#pfls_amt'+i+i).invoke('text').should('match', /^-?(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 손익금액
            cy.get('#erng_rt'+i+i).invoke('text').should('match', /^-?\d+(\.\d+)?%$/) // 보유비중
          }
        }
        cy.get('#mesuTotal').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 매수금액
        cy.get('#amountTotal').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 평가금액
        cy.get('#pfls_amtTotal').invoke('text').should('match', /^-?(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/) // 손익금액
        cy.get('#erng_rtTotal').invoke('text').should('match', /^-?\d+(\.\d+)?%$/) // 보유비중

        //계좌내역
        cy.get('#inQuiryBtn').click();
        cy.wait(5000)
        cy.get('#accListTable > .table_area > table > tbody > tr').its('length').then((rowCount) => {
          for(let i = 1; i <= rowCount; i++) {
              cy.get('#accNum'+i)
                  .invoke('text').should('match', /^\d{8}-\d{2}$/); // 계좌번호
              cy.get('#accListTable > .table_area > table > tbody > :nth-child('+i+') > :nth-child(4)')
                  .invoke('text').then((str)=>{
                    let trimedStr = str.replace(/[\n\t]+/g, '').trim();
                    expect(trimedStr).to.match(/^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/);
                  }) // 계좌자산
              cy.get('#withDrawAmount'+i, {timeout:10000})
              .invoke('text').then((str)=>{
                let trimedStr = str.replace(/[\n\t]+/g, '').trim();
                expect(trimedStr).to.match(/^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/);
              }) // 출금가능금액
          }
      });
      })
      it('모바일 웹 자산 확인', () =>{
        cy.visit('/mobile/main.jsp?cmd=myAsset');
        cy.get('.btn_info').click();
        cy.get('ul > :nth-child(1) > p > .totalAmount').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/); //총 평가금액
        cy.get('#yesuAmount').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/); //예수금
        cy.get('#ableAmount').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)/); //출금가능금액
        for(let i=1; i<=9; i++){
          cy.get('#amount'+i).invoke('text').should('match', /\d{1,3}(,\d{3})*원/); //각종 금액
        }
      })
    });
    context('My연금 메뉴 검사', () =>{
      it('My연금 메뉴 확인', ()=>{
        cy.visit('/pension/nwMyplan/Calculator.jsp?cmd=A_NW_30020')
        for(let i=2; i<= 4; i++){ //유형별 자산현황 테이블 체크
          for(let j=1; j<=6; j++){
            cy.get('.alignR > .tableDefault > table > tbody > :nth-child('+j+') > :nth-child('+i+')').invoke('text').then((str) =>{
              let trimedStr = str.replace(/[\n\t]+/g, '').trim();
              if(j <= 3) expect(trimedStr).to.match(/^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)원$/);// 총 자산, 총 납입금액, 지금금액
              else if(j == 4) expect(trimedStr).to.match(/^-?(0|[1-9][0-9]{0,2}(,[0-9]{3})*)원$/); // 평가금액
              else expect(trimedStr).to.match( /^-?\d+(\.\d+)?%$/); // 단순 수익률 및 보유 비중
            })
          }
        }
      })
    });
  });
  context('비로그인 메뉴 검사', () => {
    context('메인화면 검사', () => {
      it('홈페이지 메인화면 이미지 검사', () => {
        cy.visit('/main/Main.jsp');
        // 1. body 전체 DOM을 파일로 저장
        cy.get('body').then($body => {
          cy.writeFile('cypress/logs/main_body.html', $body.html());
        });
        // 2. main_img2 클래스를 가진 img 태그만 검사
        cy.get('img.main_img2').each(($img) => {
          const src = $img.attr('src')
          if (src && src.includes('file.koreainvestment.com')) {
            // 이미지 다운로드 및 상태 확인
            cy.request(src).its('status').should('eq', 200)
            
            // 이미지 파일명 추출
            const fileName = src.split('/').pop()
            const downloadPath = `cypress/downloads/${fileName}`
            
            // 이미지 다운로드
            cy.request({
              url: src,
              encoding: 'binary'
            }).then((response) => {
              cy.writeFile(downloadPath, response.body, 'binary')
            })
            
            // 이미지 파일 존재 확인
            cy.readFile(downloadPath).should('exist')
            
            // 이미지 파일 삭제
            cy.task('deleteFile', downloadPath)
          }
        })
      });
      it.skip('홈페이지 메인화면 공모주 청약 정보(TOBE)', () => {
        
      })
    })
    context('금융상품 > 펀드검색 화면 검사', () => {
      it('펀드검색: 상품 목록 출력 정상여부 확인', () => {
        cy.visit('/main/mall/openfund/FundSmartSearch.jsp');
        cy.get('#content > .layerPopup').then(($element) => {
          if ($element.is(':visible')) {
            cy.get('.mtl_checkbox').click();
            cy.get('#chkButton').click();
            cy.get('#content > .layerPopup').should('not.visible'); // 지수 팝업 비활성화 확인
          } else {
            cy.log('팝업이 존재하지 않습니다.');
          }
        });
        //새창을 못열기 때문에, 해당 상품이 정상적으로 나왔는지만 확인
        for(let i=1; i<=12; i++){ //TODO: 추후 동적 갯수 개선
          cy.get(':nth-child('+i+') > .info > .product-linelist-title').invoke('text').should('not.be.empty'); //상품명
          cy.get(':nth-child('+i+') > .info > .bul-dot > :nth-child(2) > div').invoke('text').should('match', /설정일\s*:\s*\d{4}\.\d{2}\.\d{2}/); //설정일 
          cy.get(':nth-child('+i+') > .info > .bul-dot > :nth-child(3) > div').invoke('text').should('match', /기준가\s*:\s*\d{1,3}(,\d{3})*\.\d{2}|기준가\s*:\s*\d+원/); //기준가
          cy.get(':nth-child('+i+') > .info > .bul-dot > :nth-child(4) > div').invoke('text').should('match', /총보수\(선취제외\)\s*:\s*\d+(\.\d+)?%/); //총보수
          cy.get(':nth-child('+i+') > :nth-child(3)').invoke('text').should('match', /\d+(\.\d+)?억/); //운용규모
          cy.get(':nth-child('+i+') > :nth-child(3) > sub').invoke('text').should('match', /\(\d{1,3}(,\d{3})*\.\d{2}억\)/); //클래스합산
        }
      })

      it('펀드 상세페이지 확인', () => {
        cy.visit('/main/mall/openfund/FundInfo_Pop.jsp?cmd=TF02a0000001_New&pfundCd=070451')
        cy.get('#header_PRDT_NAME').invoke('text').should('not.be.empty'); //상품명
        cy.get('#chart_top_RLZT_ERNG_RT_3M').invoke('text').should('not.be.empty'); //3개월 수익률
        cy.get('#top_info_BSPR').invoke('text').should('match', /\d{1,3}(,\d{3})*\.\d{2}|\d+\.\d{2}/); //기준가
        cy.get('#top_info_SUJ_P').invoke('text').should('match', /\d{1,3}(,\d{3})*\.\d{2}|\d+\.\d{2}/); //운용규모
        cy.get('#top_info_FRST_STUP_DT').invoke('text').should('match', /\d{4}\.\d{2}\.\d{2}/); // 설정일
      })
    })
    context('리서치 화면 검사', () => {
      it('전략/이슈 리포트 페이지 확인', () => {
        cy.visit('/main/research/research/Strategy.jsp?jkGubun=6', {headers: {
          'Accept-Language': 'ko-KR',
          }});
        cy.window().then((win) => {
          win.doDetail = cy.stub().as('doDetailIntercept');
        });
        for(let i=1; i<=10; i++){ //TODO: 추후 동적 갯수 개선
          cy.get(':nth-child('+i+') > .view_con > .body > .body_tit').invoke('text').should('not.be.empty'); //제목 정상 출력 
          cy.get(':nth-child('+i+') > .view_con > .body > .body_sub').invoke('text').should('not.be.empty'); //서브내용 정상 출력
          cy.get(':nth-child('+i+') > .view_con > .body').click(); // 정상적으로 클릭 이벤트 수행
        }
        cy.get('@doDetailIntercept').then((stub) => {
          const args = stub.getCalls().map(call => call.args);
          console.log('doDetailIntercept Arguments:', args);
          args.forEach(arg => {
            expect(arg[0]).to.not.be.empty;
          });
        });
      })
      it('뉴스속보 화면 검사', () =>{
        cy.visit('/main/research/research/Search.jsp?schType=report');
        cy.window().then((win) => {
          win.goDetail = cy.stub().as('goDetailIntercept');
        });
        for(let i=1; i<=10; i++){ //TODO: 추후 동적 갯수 개선
          cy.get(':nth-child('+i+') > .view_con > .body > .body_tit').invoke('text').should('not.be.empty'); //제목 정상 출력 
          cy.get(':nth-child('+i+') > .view_con > .body > .body_sub').invoke('text').should('not.be.empty'); //서브내용 정상 출력
          cy.get(':nth-child('+i+') > .view_con > .body').click(); // 정상적으로 클릭 이벤트 수행
        }
        cy.get('@goDetailIntercept').then((stub) => {
          const args = stub.getCalls().map(call => call.args);
          console.log('goDetailIntercept Arguments:', args);
          args.forEach(arg => {
            expect(arg[0]).to.include('/main/research/research/StrategyDetail.jsp?jkGubun='); //뉴스 속보 호출 링크 확인
          });
        });
      })
    })
    context('공지사항 화면 검사', () => {
      it('공지사항-홈페이지 파트', () =>{
        cy.visit('/main/customer/notice/Notice.jsp');
        var articleHeader = '';
        for(let i=1; i <= 5; i++){//TODO: 추후 동적 갯수 개선
          cy.get(':nth-child('+i+') > .t_left > a').invoke('text').then((text) => {
            articleHeader = text; // 변수에 저장
            console.log('게시글 제목:', articleHeader); // 콘솔에 출력
          });
          cy.get(':nth-child('+i+') > .t_left > a').click(); //게시글 클릭
          cy.get('.board_table > tbody > tr > :nth-child(2)').invoke('text').should('include', articleHeader); //게시글 주제와 내부 제목 일치 여부
          cy.get('#innerCtntIfm', { timeout: 10000 }).should('be.visible').then(cy.wrap).its('0.contentDocument.body').then(cy.wrap).get('a').then($links => {
            // 파일 다운로드 링크 찾기
            if($links.length == 0){
              cy.log('링크가 없습니다');
              return;
            }
            const fileLinks = $links.filter((index, link) => {
              return link.href.endsWith('.pdf') || link.href.endsWith('.html'); // 필요한 파일 형식으로 필터링
            });
            // a 태그가 존재하는지 확인
            if (fileLinks.length > 0) {
              // 모든 파일 다운로드 링크 클릭
              fileLinks.each((index, link) => {
                cy.request({url:  link.href, method:'HEAD', failOnStatusCode: false}).then((response) => {
                  expect(response.status).to.eq(200);
                });
              });
            } 
            else {
              cy.log('다운로드할 파일 링크가 없습니다.');
            }
          });
          cy.go('back');
        }
      })

    })
    context('HTS 다운로드', () => {
      it('HTS 다운로드 화면 검사', ()=>{
        cy.visit('/main/customer/systemdown/_static/TF04ea000000.jsp');
        cy.get('body').find('.btnSsm_download').each(($button) => {
          const url = $button.prop('onclick').toString().match(/'([^']+)'/)[1];
          if(url.slice(-3) == "exe"){
            cy.request({url: url, method:'HEAD', failOnStatusCode: false}).then((response) => {
              expect(response.status).to.eq(200);
            });
          }
        });
      });
    })
    context('영문 홈페이지 확인', () =>{
      it('영문 홈페이지 메인 이미지 확인', () =>{
        cy.visit('/eng/main.jsp');
        cy.get('.En_main_visual').should('be.visible'); //이미지 표출 여부 확인
        cy.get('.En_main_visual').should('have.css', 'background-image').then((bgImg) => {
        expect(bgImg).not.to.equal('none');
        const urlPattern = /url\(["']?(.*?)["']?\)/;
        const match = bgImg.match(urlPattern);
        if (match) {
          const imageUrl = match[1];
          cy.log(`배경 이미지 URL: ${imageUrl}`);
            cy.request({method: 'HEAD', url: imageUrl, failOnStatusCode: false}).then((res)=>{
              expect(res.status).to.eq(200);
            })
          }
        });
      });
      it('영문 홈페이지 지수 확인', () =>{
        cy.visit('/eng/main.jsp');
        cy.get('.cont_left02 > .tableDefault > table > tbody > tr').its('length').then((rowCount) => {
          for(let i = 1; i <= rowCount; i++) {
              cy.get('.cont_left02 > .tableDefault > table > tbody > :nth-child(' + i + ') > :nth-child(2)')
                  .invoke('text').should('match', /^\d{1,5}\.\d{2}$/); // 왼쪽 테이블 i번째 줄 지수
              cy.get('.cont_left02 > .tableDefault > table > tbody > :nth-child(' + i + ') > .t_right')
                  .invoke('text').should('match', /^\d{1,5}\.\d{2}$/); // 변화량
              cy.get('.cont_left03 > .tableDefault > table > tbody > :nth-child(' + i + ') > :nth-child(2)')
                  .invoke('text').should('match', /^\d{1,5}\.\d{2}$/); // 오른쪽 테이블 i번째 줄
              cy.get('.cont_left03 > .tableDefault > table > tbody > :nth-child(' + i + ') > .t_right')
                  .invoke('text').should('match', /^\d{1,5}\.\d{2}$/); // 변화량
          }
      });
      })
    })
  })
  context('모바일 웹 화면점검', () => {
    before(() =>{
      Cypress.on('uncaught:exception', (err, runnable) => {
        // 특정 예외를 필터링하여 무시
        if (err.message.includes('Cannot read properties of undefined (reading')) {
          // 무시하고 true 반환
          return false;
        }
        // 기본적으로 다른 예외는 처리하지 않음
        return true;
      });
    });
    it('모바일 웹 메인 화면 점검', () =>{
      cy.visit('/mobile/index.jsp');
      cy.get('.rolling_banner > ul li > a > img').each((imgTag) => {
        cy.wrap(imgTag).should('have.attr', 'src').then((imgUrl) => {
            cy.request({ method: 'HEAD', url: imgUrl, failOnStatusCode: false }).then((res) => {
                expect(res.status).to.eq(200);
            });
        });
      }); 
    })
  })
  context('모바일 키패드 및 신분증 인식서버 점검', () =>{
    before(()=>{
      Cypress.config('baseUrl', 'https://m.koreainvestment.com');
    });
    it('ntranskey 점검', () =>{
      cy.request('/servlet/plugins/ntranskeyMobile?op=getToken').as('keypadHome');
      cy.get('@keypadHome').should((response)=> {
        expect(response.status).to.equal(200);
        expect(response.body).to.include('var TK_requestToken=');
      })
    })
    it('transkeyServelet2 점검', ()=>{
      cy.request('/transkeyServlet2?op=getInitTime&origin=0').as('keypadToss');
      cy.get('@keypadToss').should((response) =>{
        expect(response.status).to.equal(200);
        expect(response.body).to.include('var decInitTime=');
      })
    })
    it('신분증 인식서버 점검', () =>{
      cy.request('/kis_noface_camera_socr/socr-api/api/check').as('socr');
      cy.get('@socr').should((response)=>{
        expect(response.status).to.equal(200);
        expect(response.body).to.include('OK');
      })
    })
    it('증명서 발급서버 점검', () =>{
      cy.request('/ReportingServer/invoker_cert.jsp').as('reporting');
      cy.get('@reporting').should((response)=>{
        expect(response.status).to.equal(200);
        expect(response.body).to.include('0');
      })
    })
  })
  context('카카오뱅크 wts 화면점검', () => {
    before(() =>{
      Cypress.config('baseUrl', 'https://channel.koreainvestment.com');
      Cypress.on('uncaught:exception', (err, runnable) => {
        // 특정 예외를 필터링하여 무시
        if (err.message.includes('Cannot read properties of undefined (reading')) {
          // 무시하고 true 반환
          return false;
        }
        // 기본적으로 다른 예외는 처리하지 않음
        return true;
      });
    });
    it('카카오뱅크 wts 메인화면', () =>{
      cy.visit('/main/main.jsp?prgmId=around');
      cy.window().then((win) => {
        win.fn_getServiceTop = cy.stub().as('fn_getServiceTop');
      });
      cy.wait(5000);
      cy.get('#inquery_best_template_list').find('li').its('length').then((rowCount) => {
        for(let i=2; i<=rowCount; i++){
          cy.get('#inquery_best_template_list > :nth-child('+i+') > a > .stock-name > .stock-title').invoke('text').should('not.be.empty');//종목명
          cy.get('#inquery_best_template_list > :nth-child('+i+') > a > .stock-name > .price > span').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)원/); //종목가격

        }
      })
      cy.get('#deal_best_template_list').find('li').its('length').then((rowCount) => {
        for(let i=2; i<=rowCount; i++){
          cy.get('#deal_best_template_list > :nth-child('+i+') > a > .stock-name > .stock-title').invoke('text').should('not.be.empty');//종목명
          cy.get('#deal_best_template_list > :nth-child('+i+') > a > .stock-name > .price > span').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)원/); //종목가격
        }
      })
    })
    let jongmok = [{'jongCode': '005930', 'jongName': '삼성전자'}, {'jongCode': '000660', 'jongName': 'SK하이닉스'}, {'jongCode': '000100', 'jongName': '유한양행'}]
    it('카카오뱅크 wts 종목상세 화면', () =>{
      for(let jong of jongmok){
        cy.visit('/stock/stock.jsp?jongCode='+jong.jongCode+'&jongName='+jong.jongName);
        cy.get('#stock_num', {timeout: 100000}).invoke('text').should('eq', jong.jongCode); //삼성전자 종목코드
        cy.get('#stock_name1').invoke('text').should('eq', jong.jongName); //삼성전자 종목명
        //cy.get('.chart-info > .color-blue > span, .chart-info > .color-red > span, .chart-info > .color-gray > span').first().invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)원/) // 삼성전자 가격
      }
    })
  })
  context('trueETN 위성 사이트 점검', () =>{
    before(()=>{
      Cypress.config('baseUrl', 'https://www.trueetn.com');
    })
    it('지수정보 점검', ()=>{
      cy.visit('/trueetn/nkis/item/itemEtn.jsp?cmd=FR11400&indexCode=2001');
      cy.get('[id^="rowData_"]').each((tr, idx)=>{
        cy.wrap(tr).within(()=>{
          const ele = Cypress.$(tr).find('td').map((i, td) => Cypress.$(td).text().trim()).get();
          expect(ele[0]).to.match(/^\d{4}-\d{2}-\d{2}$/); //날짜
          expect(ele[1]).to.match(/\d+\.\d+/); //기초자산가격
          expect(ele[2]).to.match(/\-?\d+\.\d+/); //대비
          expect(ele[3]).to.match(/\-?\d+\.\d+/); //등락률
        })
      });
    });
  });
  context('trueELW 위성 사이트 점검', () =>{
    before(()=>{
      Cypress.config('baseUrl', 'https://www.trueelw.com');
    })
    it('지수 ELW TopPick 점검', ()=>{
      cy.visit('/trueelw/indexElw/indexElw.jsp?cmd=FO10100');
      cy.get('[id^="rowData_"]').each((tr, idx)=>{
        cy.wrap(tr).within(()=>{
          const ele = Cypress.$(tr).find('td').map((i, td) => Cypress.$(td).text().trim()).get();
          expect(ele[0]).to.match(/^[A-Za-z0-9]{6}$/); //종목코드
          expect(ele[1]).to.match(/^\d{4}-\d{2}-\d{2}$/); //날짜
          expect(ele[2]).to.match(/^\d+(\.\d+)?$/); //가격
          expect(ele[3]).to.match(/^\d+(\,\d+)?$/); //변동률
          expect(ele[4]).to.match(/^(상승|하락|동일)\s{1,}\d+$/); //종목코드
          expect(ele[5]).to.match(/^[-+]?\d+(\.\d+)?%$/); //종목코드
          expect(ele[6]).to.match(/^\d{1,3}(,\d{3})*$/); //종목코드
        })
      });
      cy.get('.formRdoTxtWrap > :nth-child(1) > .lTxt').click();
      cy.get('[id^="rowData_"]').each((tr, idx)=>{
        cy.wrap(tr).within(()=>{
          const ele = Cypress.$(tr).find('td').map((i, td) => Cypress.$(td).text().trim()).get();
          expect(ele[0]).to.match(/^[A-Za-z0-9]{6}$/); //종목코드
          expect(ele[1]).to.match(/^\d{4}-\d{2}-\d{2}$/); //종목코드
          expect(ele[2]).to.match(/^\d+(\.\d+)?$/); //종목코드
          expect(ele[3]).to.match(/^\d+(\,\d+)?$/); //종목코드
          expect(ele[4]).to.match(/^(상승|하락|동일)\s{1,}\d+$/); //종목코드
          expect(ele[5]).to.match(/^[-+]?\d+(\.\d+)?%$/); //종목코드
          expect(ele[6]).to.match(/^\d{1,3}(,\d{3})*$/); //종목코드
        })
      });
    })
  });
})