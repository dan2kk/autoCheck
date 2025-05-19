const fs = require('fs')

module.exports = {
  projectId: '7sf3yd',
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        readFileMaybe(filename) {
          if (fs.existsSync(filename)) {
            return fs.readFileSync(filename, 'utf8')
          }
          return null
        },
      }),
      on('task', {
        deleteFile(filename) {
            return new Promise((resolve, reject) => {
                fs.unlink(filename, (err) => {
                    if (err) {
                        return reject(err)
                    }
                    resolve(null)
                })
            })
        },
      })
    },
    env: {
      ipIndex: process.env.IP_INDEX || '1'
    },
    baseUrl: "https://securities.koreainvestment.com",
    blockHosts: "*google-analytics.com",
    experimentalMemoryManagement : true,
    defaultCommandTimeout: 10000,
    chromeWebSecurity: false,
    testIsolation: false,
    locale: 'ko-KR',
    viewportWidth: 1280,
    viewportHeight: 960,
    numTestsKeptInMemory: 3,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    screenshotOnRunFailure: true,
  },
};
