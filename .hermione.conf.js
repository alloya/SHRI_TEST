module.exports = {
  sets: {
    desktop: {
      files: "test/hermione/desktop",
      browsers: ['desktop']
    },
    mobile: {
      files: "test/hermione/mobile",
      browsers: ['mobile']
    }
  },

  browsers: {
    chrome: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1280,
        height: 1920
      }
    },
    desktop: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 1280,
        height: 1920
      }
    },
    mobile: {
      automationProtocol: "devtools",
      desiredCapabilities: {
        browserName: "chrome",
      },
      windowSize: {
        width: 575,
        height: 1400
      }
    },
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
    },
  },
};
