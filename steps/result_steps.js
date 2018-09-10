const defineSupportCode = require('cucumber').defineSupportCode
const assert = require('assert')
const request = require('trae')
const TestData = require('../support/util/test_data')

defineSupportCode(function ({Given, Then, When}) {
  When('I request to update the result for a match of {string}', async function (gameId) {
    this.gameInfo = TestData.getGameInfo(gameId)
    this.response = undefined
    this.error = undefined
    this.matchId = '666'

    try {
      this.response = await request.post(
        `${TestData.data.url}/games/${this.gameInfo.game_slug}/matches/result`,
        {
          winner: '888888',
          score: {
            888888: {
              points: 1000
            }
          },
          status: 'FINISHED',
          game: 'QA Test Game',
          matchId: this.matchId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-gc-token': this.gameInfo.token
          }
        }
      )
    } catch (err) {
      console.log(err)
      throw err
    }
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`)
  })

  Then('I should see that the status of the match is updated', async function () {
    this.response = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/games/${this.gameInfo.game_slug}/matches/${this.matchId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-gc-token': this.gameInfo.token
          }
        }
      )
    } catch (err) {
      console.log('Error', err)
      throw err
    }
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`)

    assert.equal(
      this.response.data.status,
      'FINISHED',
      `Incorrect match status - ${this.response.data.status}`)
  })
})
