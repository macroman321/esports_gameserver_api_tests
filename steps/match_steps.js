const defineSupportCode = require('cucumber').defineSupportCode
const assert = require('assert')
const request = require('trae')
const TestData = require('../support/util/test_data')
const util = require('../support/util/util')

defineSupportCode(function ({Given, Then, When}) {
  When('I create a new match for {string}', async function (gameId) {
    this.gameInfo = TestData.getGameInfo(gameId)
    this.response = undefined
    this.error = undefined
    this.matchId = util.makeMatchId()
    console.log('matchId', this.matchId)

    try {
      this.response = await request.post(
        `${TestData.data.url}/games/${this.gameInfo.game_slug}/matches`,
        {
          matchId: this.matchId,
          game: this.gameInfo.name,
          gameSlug: this.gameInfo.game_slug,
          actors: [{'id': '888888', 'username': 'gc-pow', 'wins': [], 'draws': [], 'loses': [], 'metadata': {}}],
          status: 'PLAYING',
          winner: '',
          score: {},
          highscore: '',
          details: {},
          teamMatch: 'false',
          startTime: 124142124
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
      this.error = err
    }
    assert.equal(
      this.response.status,
      201,
      `Incorrect status code - ${this.response.status}`)
  })

  Then('I should see that the previously created match exists for the game', async function () {
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
      this.response.data.matchId,
      this.matchId,
      `Incorrect match ID - ${this.response.data.matchId}`)
  })

  When('I request a list of matches for a specific game {string}', async function (gameId) {
    this.gameInfo = TestData.getGameInfo(gameId)
    this.response = undefined
    this.error = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/games/${this.gameInfo.game_slug}/matches`,
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

  Then('I should get a list of matches', async function () {
    console.log(this.response.data.totalElements)

    assert.equal(
      this.response.data.totalElements,
      this.gameInfo.number_of_matches,
      `Wrong number of matches - ${this.response.data.totalElements}`)
  })
  When('I update a match for {string}', async function (gameId) {
    this.gameInfo = TestData.getGameInfo(gameId)
    this.response = undefined
    this.error = undefined
    this.matchId = '666'

    try {
      this.response = await request.put(
        `${TestData.data.url}/games/${this.gameInfo.game_slug}/matches/${this.matchId}`,
        {
          matchId: this.matchId,
          game: this.gameInfo.name,
          gameSlug: this.gameInfo.game_slug,
          actors:
            [{id: '888888', username: 'gc-pow', wins: [], draws: [], loses: [], metadata: {}}],
          status: 'PLAYING',
          winner: 'aaaaaaa',
          score: {},
          highscore: '',
          details: {},
          teamMatch: 'false',
          startTime: 124142124
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
  Then('I should see that the status of the match is updatedd', async function () {
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
      'PLAYING',
      `Incorrect match status - ${this.response.data.status}`)
  })
  Given('I have a match for {string}', async function (gameId) {
    this.gameInfo = TestData.getGameInfo(gameId)
    this.response = undefined
    this.matchId = '666'

    try {
      this.response = await request.post(
        `${TestData.data.url}/games/${this.gameInfo.game_slug}/matches`,
        {
          matchId: this.matchId,
          game: this.gameInfo.name,
          gameSlug: this.gameInfo.game_slug,
          actors: [{'id': '888888', 'username': 'gc-pow', 'wins': [], 'draws': [], 'loses': [], 'metadata': {}}],
          status: 'PLAYING',
          winner: '',
          score: {},
          highscore: '',
          details: {},
          teamMatch: 'false',
          startTime: 124142124
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
      201,
      `Incorrect status code - ${this.response.status}`)
  })
  When('I delete the same match', async function () {
    try {
      this.response = await request.delete(
        `${TestData.data.url}/games/${this.gameInfo.game_slug}/matches/${this.matchId}`,
        {
          headers: {
            'x-gc-token': this.gameInfo.token
          }
        }
      )
    } catch (err) {
      console.log(err)
      throw err
    }
  })
  Then('I should not be able to find it afterwards', async function () {
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
      assert.equal(
        err.status,
        400,
        `Incorrect status code - ${err.status}`)
    }
  })
})
