#
# FILE NAME: get_match_results.feature
# DESCRIPTION: get match results FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 13-Aug-2018
# NOTES:
#

  Feature: Game Server


    @manual
    Scenario: Verify that a game server is successfully created using the appropriate API
      When I navigate to backoffice
      And I click on Gameserver tab
      And I click on Create Gameserver button
      Then I should see add gameserver screen with 4 fields
      When I select "GPlay" as the provider
      And I type in "testserver1" into the remaining 3 fields
      And I click on Submit
      Then I should see the server created on the last page in the last position
