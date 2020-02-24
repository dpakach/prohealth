Feature: view notifications

  As a user
  I want to view the notifications
  So that i can see the responses to my queries and new news updates

  Background:
    Given user has created an account with email "test@test.com" and password "password12345"
    And a user with email "test@test.com" and password "password12345" has logged in

  Scenario: View top notifications
    When the user hovers to the bell icon on the webUI
    Then new notifications should be shown in the notification window

  Scenario: see all notifications using the bell icon
    When the user selects the bell icon
    Then the user should be redirected to the notification page with all notifications

  Scenario: see all notifications by selecting see all
    When the user navigates to see all link in notification window
    Then the user should be redirected to the notification page with all notifications