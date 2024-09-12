//TODO: 추후에 모듈화를 해야할듯
describe('홈페이지 아침점검 v0.1', () => {
  before(() => {
    cy.intercept('POST', '/Flash_Data/jisuData.json*').as('jisuData');
    cy.intercept('POST', 'https://www.google-analytics.com/g/collect**', (req) => {
      req.reply(204);
    }).as('gaRequest');
    parent.fe_loading = function(){
      return true;
    }
    cy.intercept('POST', 'https://127.0.0.1:64032/handshake', (req) => {
      req.headers['Origin'] = 'https://127.0.0.1:64032';
    }).as('KOSHandshake');
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
    })
  });
  })
  context('비로그인 메뉴 검사', () => {
    context.skip('메인화면 검사', () => {
      it('홈페이지 메인화면 이미지 검사', () => {
        let imgsrc = 'https://file.truefriend.com/Storage/main/main/s_visual_'; // 이미지 링크 확인
        cy.get('#slick-slide20 > .main_img_normal').should('be.visible'); //이미지 표출 여부 확인
        cy.get('#slick-slide20 > .main_img_normal').should('have.attr', 'src').and('include', imgsrc); //해당 html img src 속성 확인
        cy.get('#slick-slide20 > .main_img_normal').should('have.attr', 'src').then((src) => {cy.request(src).its('status').should('eq', 200);}); //img 정상 로드 확인
      })
      it('홈페이지 메인화면(/main/Main.jsp) 지수팝업', () => {
        cy.get('.second > [data-name="U_1001"]').click(); //하단 지수 트랙 클릭
        cy.get('#jisuModal').should('be.visible'); // 지수 팝업 활성화 여부
        cy.get('.kospi > .stork_index > strong').invoke('text').should('match', /^\d{1,3}(,\d{3})*(\.\d{2})?$/); //코스피지수
        cy.get('.kosdaq > .stork_index > strong').invoke('text').should('match', /^\d{1,3}(,\d{3})*(\.\d{2})?$/); //코스닥지수
        cy.get('#jisuModal > .modal_dialog > .modal_content > .btn_close').click(); // 닫기 버튼 클릭 
        cy.get('#jisuModal').should('not.visible'); // 지수 팝업 비활성화 확인
      })
    })
    context.skip('금융상품 > 펀드검색 화면 검사', () => {
      it('펀드검색: 상품 목록 출력 정상여부 확인', () => {
        cy.visit('/main/mall/openfund/FundSmartSearch.jsp');
        cy.get('#content > .layerPopup').then(($element) => {
          if ($element.is(':visible')) {
            cy.log('팝업이 존재합니다.');
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
    context.skip('리서치 화면 검사', () => {
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
            cy.log(arg[0]);
            expect(arg[0]).to.not.be.empty;
          });
        });
      })
      it.skip('뉴스속보 화면 검사', () =>{
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
    context.skip('공지사항 화면 검사', () => {
      it('공지사항-홈페이지 파트', () =>{
        cy.visit('/main/customer/notice/Notice.jsp');
        var articleHeader = '';
        for(let i=1; i <= 15; i++){//TODO: 추후 동적 갯수 개선
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
                const fileName = link.href.split('/').pop(); // 링크에서 파일 이름 추출
                cy.request(link.href).then((response) => {
                  // 파일이 다운로드된 후, 파일 시스템에 저장
                  cy.writeFile(`cypress/downloads/${fileName}`, response.body, 'binary');
                  // 다운로드된 파일이 있는지 확인
                  cy.readFile(`cypress/downloads/${fileName}`).should('exist');
                  // 파일 제거
                  cy.exec(`rm -f cypress/downloads/${fileName}`).then(() => {
                    cy.log(`${fileName} 파일이 제거되었습니다.`);
                  });
                  cy.wait(1000); // 1초 대기
                });
              });
            } else {
              cy.log('다운로드할 파일 링크가 없습니다.');
            }
          });
          cy.go('back');
        }
      })

    })
    context.skip('HTS 다운로드', () => {
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
    context.skip('영문 홈페이지 확인', () =>{
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
  context('로그인 메뉴 검사', () =>{
    context.skip('나의 자산 검사', () =>{
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
        cy.wait(10000)
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
    });
    context.skip('My연금 메뉴 검사', () =>{
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
    context('트레이딩 메뉴 검사', () => {
      it.skip('주식주문 화면 검사', () =>{
        cy.visit('/main/bond/deal/StockDeal.jsp');
        cy.get('#mItemCode').eq(0).type('005930{enter}');
        cy.get('#stockName_1').should('have.value', '삼성전자');
      })
      it.skip('선물옵션주문 화면 검사', () =>{
        cy.visit('/main/bond/domestic/FutureOptionDeal.jsp');
        cy.get('#tabHo02 > .Tabsm2').click(); //기본 선물옵션 종목에 대해
        cy.get('.CI-GRID-BODY-INNER > .CI-GRID-BODY-TABLE > .CI-GRID-BODY-TABLE-TBODY').find('*').its('length').then((rowCount) => { //시간별 체결 목록 확인
          for(let i = 1; i <= Math.min(rowCount, 100); i++) {
              cy.get('.CI-GRID-BODY-INNER > .CI-GRID-BODY-TABLE > .CI-GRID-BODY-TABLE-TBODY > :nth-child(' + i + ') > [data-name="row1"]')
                  .invoke('text').should('match', /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/); // 시간
              cy.get('.CI-GRID-BODY-INNER > .CI-GRID-BODY-TABLE > .CI-GRID-BODY-TABLE-TBODY > :nth-child(' + i + ') > [data-name="row2"]')
                  .invoke('text').should('match', /^\d{1,3}(?:\.\d{1,2})?$/); //선물지수
              cy.get('.CI-GRID-BODY-INNER > .CI-GRID-BODY-TABLE > .CI-GRID-BODY-TABLE-TBODY > :nth-child(' + i + ') > [name="row3"]')
                  .invoke('text').should('match', /^\d{1,3}(?:\.\d{1,2})?$/); // 전일대비 변화량
              cy.get('.CI-GRID-BODY-INNER > .CI-GRID-BODY-TABLE > .CI-GRID-BODY-TABLE-TBODY > :nth-child(' + i + ') >  [data-name="row4"]')
                  .invoke('text').should('match', /^-?\d+\.\d{2}$/); // 등락률
              cy.get('.CI-GRID-BODY-INNER > .CI-GRID-BODY-TABLE > .CI-GRID-BODY-TABLE-TBODY > :nth-child(' + i + ') >  [data-name="row5"]')
                  .invoke('text').should('match', /^[1-9]\d*$/); // 체결량
          }
      });
      })
    });
    context.skip('이체 실행', () => {
      it('이체 화면 검사', () =>{
        cy.visit('/main/banking/opentransfer/NTransfer.jsp');
      })
    })
    context.skip('오픈뱅킹 테스트', () => {
      it('오픈뱅킹 가져오기 검사', () =>{
        cy.visit('/main/banking/openBanking/ImportMyAcc.jsp');
        var optionLength = 0;
        cy.get('select#ACC_NO option').its('length').then((len) =>{
          optionLength = len;
        })
        for(let i=2; i<= optionLength; i++){
          cy.get('.selectList > :nth-child('+i+') > a').click({force:true});
          cy.wait(3000);
          cy.get('#IBCOM_S_O_PAYMENT').invoke('val').then((str) => console.log(str))
          cy.get('#DNCL_AMT').invoke('val').then((str) => console.log(str))
          cy.get('#CMA_EVLU_AMT').invoke('val').then((str) => console.log(str))
        }
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
    var wtsUrl = [];
    it('카카오뱅크 wts 메인화면', () =>{
      cy.visit('/main/main.jsp?prgmId=around');
      cy.window().then((win) => {
        win.fn_getServiceTop = cy.stub().as('fn_getServiceTop');
      });
      cy.wait(10000);
      cy.get('#inquery_best_template_list').find('li').its('length').then((rowCount) => {
        for(let i=2; i<=rowCount; i++){
          cy.get('#inquery_best_template_list > :nth-child('+i+') > a > .stock-name > .stock-title').invoke('text').should('not.be.empty');//종목명
          cy.get('#inquery_best_template_list > :nth-child('+i+') > a > .stock-name > .price > span').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)원/); //종목가격
          cy.get('#inquery_best_template_list > :nth-child('+i+') > a')
        }
      })
      cy.get('#deal_best_template_list').find('li').its('length').then((rowCount) => {
        for(let i=2; i<=rowCount; i++){
          cy.get('#deal_best_template_list > :nth-child('+i+') > a > .stock-name > .stock-title').invoke('text').should('not.be.empty');//종목명
          cy.get('#deal_best_template_list > :nth-child('+i+') > a > .stock-name > .price > span').invoke('text').should('match', /^(0|[1-9][0-9]{0,2}(,[0-9]{3})*)원/); //종목가격
        }
      })
    })
    it('카카오뱅크 wts 종목상세 화면', () =>{
      cy.visit('/stock/stock.jsp?jongCode=005930&jongName=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90');
    })
  })
})