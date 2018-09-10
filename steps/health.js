const defineSupportCode = require('cucumber').defineSupportCode
const assert = require('assert')
const request = require('trae')
const TestData = require('../support/util/test_data')

defineSupportCode(function ({Given, Then, When}) {
  When('I check the ApiGateway', async function () {
    this.response = undefined

    try {
      this.response = await request.get(
        `${TestData.data.url}/health`
      )
    } catch (err) {
      console.log(err)
      throw err
    }
  })
  Then('I should get the appropriate response', async function () {
    assert.equal(
      this.response.status,
      200,
      `Incorrect status code - ${this.response.status}`)
  })
})
