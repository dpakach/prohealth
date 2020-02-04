Feature: Ask a question
  As a user
  I want to ask health related questions
  So that i can get a feed back


  Scenario: ask a question
    Given user has created an account with email "test@test.com" and password "pass12345"
    And a user with email "test@test.com" and password "pass12345" has logged in
    When the user selects Ask A Question
    And user asks a question by filling the following details in the question form:
      | Title           | Moral Teeth                                      |
      | Description     | I want to remove my moral teeth on the lest side |
      | Related         | Dental Surgeon                                   |
      | Name of Patient | Swoichha                                         |
      | Age             | 22                                               |
      | Weight          | 48                                               |
      | Height          | 5                                                |
    Then the user should be redirected to the query page with title "Moral Teeth"