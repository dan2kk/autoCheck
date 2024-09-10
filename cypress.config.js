module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://securities.koreainvestment.com",
    hosts: {
    "securities.koreainvestment.com": "210.96.164.74"
    },
    blockHosts: "*google-analytics.com",
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    testIsolation: false,
    locale: 'ko-KR',
    viewportWidth: 1280,
    viewportHeight: 960
    
  },
};
