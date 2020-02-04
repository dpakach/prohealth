Feature: browse to signup page
  As a new user
  I want to browse to signup page
  So that i can create a new account in prohealth

  Background:
    Given user has browsed to the homepage

  Scenario: browse to signup page using register now
    Given user has browsed to the login page
    When user selects register now!
    Then user should be redirected to signup page

  Scenario: browse to signup page using signup
    When user selects signup
    Then user should be redirected to signup page


