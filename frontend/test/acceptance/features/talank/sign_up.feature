Feature: create user
  As a new user
  I want to create a new account in prohealth
  So that I can be an authenticated user

  Scenario: create a valid user
    Given user has browsed to the signup page
    When user enters the following details in the signup form
      | First Name | Last Name | email         | password | Confirm password | Select date | Gender |
      | Test       | Test      | test@test.com | pass1234 | pass1234         | 2020-01-22  | Male   |
    And user tries to sign up
    Then a success message "signed up succesfully" should be visible
    And user "Test Test" should be created
    And the user should be redirected to login page

  Scenario: create an already existing user
    Given a user has created an account with email "test@test.com"
    And user has browsed to the signup page
    When user enters the following details in the signup form
      | First Name | Last Name | email         | password | Confirm password | Select date | Gender |
      | Test       | Test      | test@test.com | pass1234 | pass1234         | 2020-01-22  | Male   |
    And user tries to sign up
    Then an error "user with this email already exists." should be shown above email field
    And a new user with email "test@test.com" should not be created

  Scenario Outline: create an user with incomplete user details
    Given user has browsed to the signup page
    When user enters the following details in the signup form
      | First Name     | Last Name      | email   | password   | Confirm password   | Select date | Gender   |
      | "<first name>" | "<last name> " | <email> | <password> | <confirm password> | <date>      | <gender> |
    Then signup button should be disabled
    Examples:
      | first name | last name | email         | password | confirm password | date       | gender |
      | Test       |           | test@test.com | pass1234 | pass1234         | 2020-01-22 | Male   |
      |            | Test      | test@test.com | pass1234 | pass1234         | 2020-01-22 | Male   |
      | Test       | Test      | test.com      | pass1234 | pass1234         | 2020-01-22 | Male   |
      | Test       | Test      | test@test     | pass1234 | pass1234         | 2020-01-22 | Male   |
      | Test       | Test      | test@test.com | pass1234 | pass12           | 2020-01-22 | Male   |
      | Test       | Test      | test@test.com |          | pass1234         | 2020-01-22 | Male   |
      | Test       | Test      | test@test.com | pass     |                  | 2020-01-22 | Male   |




