// pages/ToDoPage.js

const { By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const { expect } = require('chai');

class ToDoPage extends BasePage {
    constructor(driver) {
        super(driver);  // Inherit from BasePage
        if (this.driver.findElement) {  // For Selenium 
            this.todoInputField = By.id('sampletodotext'); // ID for the input field where the user types the to-do item
            this.addButton = By.id('addbutton'); // ID for the add button
            this.todoList = By.xpath('//*[@class="list-unstyled"]//span'); // xpath for the to-do list 
            this.todoListDone = By.xpath('//*[@class="list-unstyled"]//span[@class="done-true"]'); // xpath for the to-do list DONE
        } else if (this.driver.locator) {  // For Playwright 
            this.todoInputField = '#sampletodotext';
            this.addButton = '#addbutton'
            this.todoList = '//*[@class="list-unstyled"]//span'
            this.todoListDone = '//*[@class="list-unstyled"]//span[@class="done-true"]'
        }
    }

    async waitForToDoPageToLoad() {
        await this.waitForElement(this.todoInputField)
    }

    // Add a new to-do item
    async addToDoItem(itemName) {
        await this.enterText(this.todoInputField, itemName)
        await this.click(this.addButton)

    }

    // Delete a to-do item by name
    async deleteToDoItem(itemName) {
        const items = await this.getElement(this.todoList)
        for (let item of items) {
            const text = await item.getText();
            if (text === itemName) {
                const checkbox = await item.findElement(By.xpath('//input[@type="checkbox"]')); // Assuming each item has checkbox
                await checkbox.click();
                break;
            }
        }
    }

    // Get the list of to-do items
    async getToDoItems() {
        const items = await this.getElement(this.todoList)
        let itemNames = [];
        for (let item of items) {
            const text = await item.getText();
            itemNames.push(text);
        }
        return itemNames;
    }

    // Get the list of to-do items - DONE
    async getToDoItemsDone() {
        const items = await this.driver.findElements(this.todoListDone);
        let itemNames = [];
        for (let item of items) {
            const text = await item.getText();
            itemNames.push(text);
        }
        return itemNames;
    }


}

module.exports = ToDoPage;
