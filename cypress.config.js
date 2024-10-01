module.exports = {
  projectId: '7sf3yd',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://securities.koreainvestment.com",
    "https://securities.koreainvestment.com" : "https://210.96.164.102",
    "https://www.trueetn.com" : "https://210.96.164.102",
    "https://www.trueelw.com" : "https://210.96.164.102",
    blockHosts: "*google-analytics.com",
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    testIsolation: false,
    locale: 'ko-KR',
    viewportWidth: 1280,
    viewportHeight: 960,
    experimentalStudio: true,
  },
};
