#
# FILE NAME: result.feature
# DESCRIPTION: result FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 13-Aug-2018
# NOTES:
#

Feature: Result

  Scenario: Update match result
    When I request to update the result for a match of "game_2"
    Then I should see that the status of the match is updated