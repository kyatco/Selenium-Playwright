@todo
Feature: Add and Delete 

  Scenario: User adds a new to-do item
    Given I navigate to the to do list page
    When I add a new to-do item "Add To Do List"
    Then I should see "Add To Do List" in the to-do list

  Scenario: User deletes a tco-do item
    Given I have a to-do item "First Item"
    When I delete the to-do item "First Item"
    Then the to-do item "First Item" should be crossed out