@login
Feature: Login, Add and Delete item to the application

  Scenario: User logs in with valid credentials
    Given I navigate to the login page
    When I enter valid credentials username "tomsmith" and password "SuperSecretPassword!"
    Then I should be logged in successfully

 