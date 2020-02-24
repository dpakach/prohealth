Feature: View and read health news

  As a user
  I want to view news headlines
  so that i can read more about news related to health

  Background:
    Given user has browsed to the homepage

  Scenario: User tries to view news without registering to ProHealth from homepage
    When user selects News
    Then a list of news headlines and little description should be shown

  Scenario: User tries to view news from signup page
    Given user has browsed to the signup page
    When user selects News
    Then a list of news headlines and little description should be shown

  Scenario: User tries to view news from login page
    Given user has browsed to the login page
    When user selects News
    Then a list of news headlines and little description should be shown

  Scenario: User tries to view news after logging in
    Given user has created an account with email "test@test.com" and password "password12345"
    And user has browsed to the login page
    And user logs in with email "test@test.com" and password "password12345"
    When user selects News
    Then a list of news headlines and little description should be shown