const { expect } = require('chai')
const axios = require('axios')
const { describe } = require('mocha')

describe('API test - dummyjson.com', () => {
  it('GET /posts harusnya return status 200', async () => {
    const res = await axios.get('https://dummyjson.com/users')
    expect(res.status).to.equal(200)
    expect(res.data.users[0].id).to.be.a('number')
    console.log(res.data.users[0])
  })
})
