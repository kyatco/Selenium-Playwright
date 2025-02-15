const { By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

class BasePage {
    constructor(driver) {
        this.driver = driver;
    }
    // A method to capture screenshots
    async takeScreenshot(testName) {
        const screenshotPath = path.resolve(__dirname, '..', 'screenshots');
        if (!fs.existsSync(screenshotPath)) {
            fs.mkdirSync(screenshotPath);
        }
        const screenshot = await this.driver.takeScreenshot();
        const fileName = `${testName}_${new Date().toISOString()}.png`;
        fs.writeFileSync(path.join(screenshotPath, fileName), screenshot, 'base64');
        console.log(`Screenshot saved as ${fileName}`);
    }

    //Go to url
    async navigate(url) {
        if (this.driver.get) {
            await this.driver.get(url); // For Selenium WebDriver
        } else if (this.driver.goto) {
            await this.driver.goto(url); // For Playwright
        }
    }


    // Wait for an element
    async waitForElement(locator, timeout = 15000) {
        if (this.driver.waitForSelector) {
            await this.driver.waitForSelector(locator, { timeout }); // For Playwright
        } else if (this.driver.findElement) {
            await this.driver.wait(until.elementLocated(locator), 15000);// For Selenium WebDriver
        }
    }

    // Get element
    async getElement(locator) {
        await this.driver.wait(until.elementLocated(locator), 15000);
        return await this.driver.findElements(locator);
    }

    // Click element
    async click(locator) {
        if (this.driver.click) {
            await this.driver.click(locator); // For Playwright
        } else if (this.driver.findElement) {
            const element = await this.driver.findElement(locator);// For Selenium WebDriver
            await element.click(); 
        }
    }
    // Enters text into an input field
    async enterText(locator, text) {
        console.log(`enter ${text}`)
        await this.waitForElement(locator); // Wait for the element to be visible
        if (this.driver.locator) {// For Playwright
            await this.driver.locator(locator).fill(text)
        } else if (this.driver.findElement) {// For Selenium WebDriver
            const element = await this.driver.findElement(locator);
            await element.sendKeys(text);
        }
    }

    // Get the URL of the current page
    async getCurrentUrl() {
        if (this.driver.getCurrentUrl) {
            // For Selenium WebDriver
            return await this.driver.getCurrentUrl();
        } else if (this.driver.url) {
            // For Playwright
            return await this.driver.url();
        }
    }


}

module.exports = BasePage;
