// support/hooks.js
const { Before, After, AfterStep, setWorldConstructor, setDefaultTimeout } = require('@cucumber/cucumber');
const { Builder } = require('selenium-webdriver');
const playwright = require('playwright');
const path = require('path');
const BasePage = require('../pages/BasePage');  // Import BasePage
const LoginPage = require('../pages/LoginPage');
const ToDoPage = require('../pages/ToDoPage');

// Setting default timeout for Cucumber steps
setDefaultTimeout(60000);

// Set up World Constructor for accessing the driver in the steps
setWorldConstructor(function ({ attach, parameters }) {
  this.attach = attach;
  this.parameters = parameters;
  this.driver = null;
  this.browser = process.env.BROWSER || 'selenium'
});

// Before hook to initialize the browser session dynamically
Before(async function () {
  const { browser } = this;
  console.log(`BROWSER ${browser}`)
  // Set the browser type from parameters or environment
  if (browser != 'playwright') {
    driver = new Builder().forBrowser('chrome').build();  // Initialize driver before each test
    this.driver = driver
    this.basePage = new BasePage(this.driver);  // Initialize BasePage with the driver
    this.loginPage = new LoginPage(driver);
    this.toDoPage = new ToDoPage(driver);
  } else {
    this.browserInstance = await playwright.chromium.launch({ headless: false });
    this.page = await this.browserInstance.newPage();
    this.driver = this.page
    this.basePage = new BasePage(this.driver);  // Initialize BasePage with the driver
    this.loginPage = new LoginPage(this.driver);
    this.toDoPage = new ToDoPage(this.driver);
  }

});

AfterStep(async function (step) {
  if (step.result.status === 'FAILED') {
    // Capture screenshot after each step
    await this.basePage.takeScreenshot(step.pickle.name);  // Take screenshot with the step name
    // Optionally log out the step's status
    console.log(`Screenshot captured for step: ${step.pickle.name}`);
    if (this.driver) {
      await driver.quit();  // Quit the WebDriver session after if step failed
    }
  }
});

// After hook to clean up and close the browser session
After(async function () {
  const { browser } = this;

  if (browser === 'selenium') {
    await this.driver.quit();
  } else if (browser === 'playwright') {
    await this.browserInstance.close();
  }
});
