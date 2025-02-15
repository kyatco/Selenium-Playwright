
# Selenium WebDriver Cucumber Setup with Page Object Model (POM)

This repository demonstrates how to set up an automation testing framework using **Selenium WebDriver**, **JavaScript**, **Node.js**, **Page Object Model (POM)**, and **Cucumber** for behavior-driven testing.

### Prerequisites

Before setting up the project, ensure you have the following installed:

1. **Node.js** (Latest LTS version)  
   Download from [Node.js](https://nodejs.org/).

2. **Chrome Browser** (or any other browser of choice)  
   You can install Chrome from [here](https://www.google.com/chrome/).

### Step 1: Clone the Repository

First, clone this repository to your local machine.

```bash
git clone <repository-url>
cd Selenium-Playwright
```

### Step 2: Install Dependencies

In the project folder, run the following command to install all the required dependencies:

```bash
npm install
```

This will install:

- `selenium-webdriver`: For WebDriver interaction with the browser.
- `@cucumber/cucumber`: For running Cucumber tests.
- `chai`: Assertion library.
- `chromedriver`: To automate Google Chrome browser.
- `@cucumber/pretty-formatter`: For pretty test output.
- `cucumber-html-reporter`: For generating HTML reports.
- `playwright`: For Playwright

### Step 3: Set Up Folder Structure

Ensure your folder structure matches this layout:

```
selenium-cucumber-pom
├── features/
│   └── login.feature           # Cucumber feature file for Login
│   └── todolist.feature        # Cucumber feature file for To Do List
├── node_modules/               # Dependencies installed by npm
├── pages/
│   └── LoginPage.js            # Page Object for the Login page
│   └── ToDoPage.js             # Page Object for the To Do page
│   └── BasePage.js             # Contains functions
├── stepdefinitions/
│   └── steps.js                # Step definitions for Cucumber
├── support/
│   └── hooks.js                # Hooks for setup/cleanup
├── reports/                    # Test reports (if using HTML reporter)
├── node_modules/               # Installed dependencies
├── cucumber.js                 # Cucumber configuration file
├── package.json                # Node.js project settings
└── README.md                   # This documentation

```

### Step 4: Running the Tests in Selenium

```bash
npm test
```

### Step 5: Running the Tests in Playwright 

Only login feature is supported in Playwright

```bash
BROWSER=playwright npx cucumber-js --tags @login
```

This will run the Cucumber scenarios and output the results in the console.
