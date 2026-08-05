Feature: Form Authentication

  @demo
  Scenario: Successful login and logout
    Given I open the "Form Authentication" page
    When I log in with valid credentials
    Then the Secure Area page should be open
    And the success message should be displayed
    When I click the logout button
    Then the Login page should be open
