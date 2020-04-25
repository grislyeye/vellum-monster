module.exports = {
  plugins: {
    local: {
      browsers: ['chrome'],
      browserOptions: {
        chrome: [
          'headless',
          'disable-gpu',
          'no-sandbox'
        ]
      }
    }
  }
}
