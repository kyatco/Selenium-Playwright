module.exports = {
    default: `--format @cucumber/pretty-formatter --format json:./reports/cucumber_report.json --require stepdefinitions/**/*.js --require support/hooks.js`,
  };
  
  