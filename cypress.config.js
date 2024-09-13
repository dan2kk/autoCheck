module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://securities.koreainvestment.com",
    blockHosts: "*google-analytics.com",
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    testIsolation: false,
    locale: 'ko-KR',
    viewportWidth: 1280,
    viewportHeight: 960
    
  },
};
