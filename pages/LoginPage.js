const { By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const { expect } = require('chai');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);  // Inherit from BasePage
    if (this.driver.findElement) {  // For Selenium 
      this.usernameField = By.id('username');
      this.passwordField = By.id('password');
      this.loginButton = By.xpath('//*[@class="radius" and @type="submit"]');
    } else if (this.driver.locator) {  // For Playwright 
      this.usernameField = '#username';
      this.passwordField = '#password';
      this.loginButton = '//*[@class="radius" and @type="submit"]';
    }
  }
  
  async waitForLoginPageToLoad() {
    await this.waitForElement(this.usernameField)
  }
  
  async setUsername(username) {
    await this.enterText(this.usernameField, username)
  }

  async setPassword(password) {
    await this.enterText(this.passwordField, password)

  }
  async submitLogin() {
    await this.click(this.loginButton)
  }

  async verifyHomePage() {
    let currentUrl = await this.getCurrentUrl()
    expect(currentUrl).to.include('secure');
  }


}

module.exports = LoginPage;
