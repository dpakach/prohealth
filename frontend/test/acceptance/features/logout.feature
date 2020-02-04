Feature: logout
  As a user
  I want to logout
  So that i can secure my data and actions when i am not using prohealth services

  Scenario: logout
    Given user has logged in with email "test@test.com" and password "password12345"
    When the user selects logout
    Then the user should be logged out and redirected to the login page

