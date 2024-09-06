describe('홈페이지 아침점검 v0.1', () => {
  before(() => {
    
  })
  beforeEach(() => {
    cy.intercept('POST', '/Flash_Data/jisuData.json*').as('jisuData');
    cy.intercept('POST', 'https://www.google-analytics.com/g/collect**', (req) => {
      req.reply((res) => {
        res.send({ statusCode: 204 }); // 예시: 200 응답으로 가로채기
      });}).as('gaRequest');
    parent.fe_loading = function(){
      return true;
    }
    //TODO: 굳이 메인 페이지를 재방문 해야할 이유는?
    cy.visit('/main/Main.jsp')
  })
  context('비로그인 메뉴 검사', () => {
    context('메인화면 검사', () => {
      it('홈페이지 메인화면 이미지 검사', () => {
        let imgsrc = 'https://file.truefriend.com/Storage/main/main/s_visual_1_6501.png'; // 이미지 링크 확인
        cy.get('#slick-slide20 > .main_img_normal').should('be.visible'); //이미지 표출 여부 확인
        cy.get('#slick-slide20 > .main_img_normal').should('have.attr', 'src').and('include', imgsrc); //해당 html img src 속성 확인
        cy.get('#slick-slide20 > .main_img_normal').should('have.attr', 'src').then((src) => {cy.request(src).its('status').should('eq', 200);}); //img 정상 로드 확인
      })
      it('홈페이지 메인화면(/main/Main.jsp) 지수팝업', () => {
        cy.get('.second > [data-name="U_1001"]').click(); //하단 지수 트랙 클릭
        cy.get('#jisuModal').should('be.visible'); // 지수 팝업 활성화 여부
        cy.get('.kospi > .stork_index > strong').invoke('text').should('match', /^\d{1,3}(,\d{3})*(\.\d{2})?$/); //코스피지수
        cy.get('.kosdaq > .stork_index > strong').invoke('text').should('match', /^\d{1,3}(,\d{3})*(\.\d{2})?$/); //코스닥지수
        // cy.get('selector').invoke('text').should('match', /정규표현식/);
        // cy.get('selector').invoke('text').should('match', /정규표현식/);
        // cy.get('selector').invoke('text').should('match', /정규표현식/);
        cy.get('#jisuModal > .modal_dialog > .modal_content > .btn_close').click(); // 닫기 버튼 클릭 
        cy.get('#jisuModal').should('not.visible'); // 지수 팝업 비활성화 확인
      })
    })
    context('금융상품 > 펀드검색 화면 검사', () => {
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

      //이슈 1 => showProgressBar() => window.parent 사용 => solved
      it('펀드 상세페이지 확인', () => {
        cy.visit('/main/mall/openfund/FundInfo_Pop.jsp?cmd=TF02a0000001_New&pfundCd=070451')
        cy.get('#header_PRDT_NAME').invoke('text').should('not.be.empty'); //상품명
        cy.get('#chart_top_RLZT_ERNG_RT_3M').invoke('text').should('not.be.empty'); //3개월 수익률
        cy.get('#top_info_BSPR').invoke('text').should('match', /\d{1,3}(,\d{3})*\.\d{2}|\d+\.\d{2}/); //기준가
        cy.get('#top_info_SUJ_P').invoke('text').should('match', /\d{1,3}(,\d{3})*\.\d{2}|\d+\.\d{2}/); //운용규모
        cy.get('#top_info_FRST_STUP_DT').invoke('text').should('match', /\d{4}\.\d{2}\.\d{2}/); // 설정일
      })
    })
    //이슈 2 => parseDate의 locale 미설정으로 인한 날짜 오류
    context('리서치 화면 검사', () => {
      // it('전략/이슈 리포트 페이지 확인', () => {
      //   cy.visit('/main/research/research/Strategy.jsp?jkGubun=6');
      // })
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
        //TODO: 페이지 방문 후 캐시된 페이지가 아닌 신규 방문으로 속도 저하 이슈
        cy.visit('/main/customer/notice/Notice.jsp');
        var articleHeader = '';
        for(let i=1; i <= 15; i++){//TODO: 추후 동적 갯수 개선
          cy.get(':nth-child('+i+') > .t_left > a').invoke('text').then((text) => {
            articleHeader = text; // 변수에 저장
            console.log('게시글 제목:', articleHeader); // 콘솔에 출력
          });
          cy.get(':nth-child('+i+') > .t_left > a').click(); //게시글 클릭
          cy.get('.board_table > tbody > tr > :nth-child(2)').invoke('text').should('include', articleHeader); //게시글 주제와 내부 제목 일치 여부
          cy.get('#innerCtntIfm', { timeout: 10000 }).should('be.visible').then(cy.wrap).its('0.contentDocument.body').then(cy.wrap).find('a').then($links => {
            // 파일 다운로드 링크 찾기
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
                  
                  // 다음 링크 클릭을 위해 일정 시간 대기 (필요에 따라 조정)
                  cy.wait(1000); // 1초 대기
                });
              });
            } else {
              cy.log('다운로드할 파일 링크가 없습니다.');
            }
          });
          cy.go('back');
          //cy.visit('/main/customer/notice/Notice.jsp');
        }
      })

    })
  })
  // context('로그인 메뉴 검사', () =>{
  //   before(() => {
  //     cy.on('uncaught:exception', () => {
  //       cy.visit('/main/member/login/login.jsp')
  //       cy.url().should('eq', '/main/Main.jsp')
  //     });
  //   })
  //   it('나의자산 메뉴 확인', ()=>{
  //     cy.visit('/main/myAsset/myAsset.jsp')
  //     cy.get('.kospi > .stork_index > strong')
  //   })
  // })
})