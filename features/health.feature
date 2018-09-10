#
# FILE NAME: health.feature
# DESCRIPTION: health FEATURE
# AUTHOR: Ivan Babić (IB)
# CREATED: 15-Aug-2018
# NOTES:
#

  Feature: Health

    Scenario: Check ApiGateway
      When I check the ApiGateway
      Then I should get the appropriate response