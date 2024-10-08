module.exports = {
  projectId: '7sf3yd',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://securities.koreainvestment.com",
    "https://securities.koreainvestment.com" : "https://210.96.164.104",
    "https://www.trueetn.com" : "https://210.96.164.104",
    "https://www.trueelw.com" : "https://210.96.164.104",
    blockHosts: "*google-analytics.com",
    experimentalMemoryManagement : true,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    testIsolation: false,
    locale: 'ko-KR',
    viewportWidth: 1280,
    viewportHeight: 960,
    numTestsKeptInMemory: 3,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
  },
};
