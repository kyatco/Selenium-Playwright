const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

Given('I navigate to the login page', async function () {
  const { driver, page, browser } = this;
  let loginurl = 'https://the-internet.herokuapp.com/login'
  console.log(`Navigate to ${loginurl} browser ${browser}`)
  await this.basePage.navigate(loginurl)
});

When('I enter valid credentials username {string} and password {string}', async function (username,password) {
  console.log(`Input credentials`)
  await this.loginPage.setUsername(username);
  await this.loginPage.setPassword(password);
  await this.loginPage.submitLogin();
});


Then('I should be logged in successfully', async function () {
  console.log(`Verify Home Page`)
  await this.loginPage.verifyHomePage()
});

//TO DO LIST
//ADD
Given('I navigate to the to do list page', async function () {
  let todourl = 'https://lambdatest.github.io/sample-todo-app/'
  console.log(`Navigate to ${todourl}`)
  await this.basePage.navigate(todourl)
  await this.toDoPage.waitForToDoPageToLoad();
});

When('I add a new to-do item {string}', async function (itemName) {
  console.log(`Add item in to do list`)
  await this.toDoPage.addToDoItem(itemName);
});


Then('I should see {string} in the to-do list', async function (itemName) {
  console.log(`Verify item is added in to do list`)
  const items = await this.toDoPage.getToDoItems();
  expect(items).to.include(itemName);
});

//DELETE
Given('I have a to-do item {string}', async function (itemName) {
  let todourl = 'https://lambdatest.github.io/sample-todo-app/'
  console.log(`Navigate to ${todourl}`)
  await this.basePage.navigate(todourl)
  await this.toDoPage.waitForToDoPageToLoad();
});

When('I delete the to-do item {string}', async function (itemName) {
  console.log(`Delete to do list item`)
  await this.toDoPage.deleteToDoItem(itemName);//Click checkbox on the item
});

Then('the to-do item {string} should be crossed out', async function (itemName) {
  console.log(`Verify item is crossed out`)
  const items = await this.toDoPage.getToDoItemsDone();
  expect(items).to.include(itemName);
});