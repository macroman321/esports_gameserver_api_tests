#
# FILE NAME: match.feature
# DESCRIPTION: match FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 09-Aug-2018
# NOTES:
#

Feature: Match

  Scenario: Create a match
    When I create a new match for "game_2"
    Then I should see that the previously created match exists for the game

  Scenario: Get a list of matches
    When I request a list of matches for a specific game "game_2"
    Then I should get a list of matches

  @manual
  Scenario: Request match results using Backoffice
    When I navigate to the Backoffice
    And I click on the Matches tab
    And I select the appropriate Gameserver from the dropdown menu
    Then I should see a list of matches

  Scenario: Update a match
    When I update a match for "game_2"
    Then I should see that the status of the match is updatedd

  Scenario: Delete a match
    Given I have a match for "game_3"
    When I delete the same match
    Then I should not be able to find it afterwards