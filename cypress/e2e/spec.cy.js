describe('홈페이지 아침점검 v0.1', () => {
  before(() => {
    
  })
  beforeEach(() => {
    cy.intercept('POST', '/Flash_Data/jisuData.json*').as('jisuData');
    cy.intercept('POST', 'https://www.google-analytics.com/g/collect**', (req) => {
      req.reply((res) => {
        res.send({ statusCode: 204 }); // 예시: 200 응답으로 가로채기
      });
    }).as('gaRequest');
    parent.fe_loading = function(){
      return true;
    }
    // cy.intercept('GET', 'https://securities.koreainvestment.com/inc/js/common/uilib_2021.js*', (req)=> {
    //   req.reply((res) => {
    //     res.send({statusCode: 200, fixture: 'uilib.js'})
    //   })
    // })
    cy.visit('/main/Main.jsp').then(() => {
    })
    // Cypress.on('uncaught:exception', (err, runnable) => {
    //   // 특정 오류를 무시하고 계속 진행
    //   if (err.message.includes('fe_loading')) {
    //     return false; // 오류를 무시하고 테스트 계속
    //   }
    // });
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
      it('펀드검색 화면 확인', () => {
        cy.visit('/main/mall/openfund/FundSmartSearch.jsp').then(() => {
          // 페이지가 로드된 후 parent 객체를 모의합니다.
        });
      })

      //이슈 1 => showProgressBar() => window.parent 사용
      // it('펀드 상세페이지 확인', () => {
      //   cy.visit('/main/mall/openfund/FundInfo_Pop.jsp?cmd=TF02a0000001_New&pfundCd=070451')
      // })
    })
    context('리서치 화면 검사', () => {
      it('투자전략 확인', () => {
        //cy.intercept('GET', '/path/to/your.wasm', { fixture: 'your-mock-file.wasm' }).as('wasmRequest');
        
        cy.visit('/main/research/research/Strategy.jsp?jkGubun=6', {
          onBeforeLoad : (win) => {
            win.parent.fe_loading = function () {}
            Object.defineProperty(win.navigator, 'language', {
              value: 'ko'
            })
          }
        })
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