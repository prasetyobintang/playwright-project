const { expect } = require('chai')
const axios = require('axios')

describe('Login API - DummyJson', () => {
  it('POST /login harusnya return 200', async () => {
    const res = await axios.post('https://dummyjson.com/auth/login', {
      username: 'emilys',
      password: 'emilyspass'
    })
    // console.log(res.data)
    expect(res.status).to.equal(200)

    expect(res.data.id).to.be.a('number')
    expect(res.data.username).to.be.a('string')
    expect(res.data.email).to.be.a('string')
    expect(res.data.email).to.include('@')

    expect(res.data.accessToken).to.be.a('string')
    expect(res.data.accessToken).to.not.be.empty
  })

  it('response harus punya token', async () => {
    const res = await axios.post('https://dummyjson.com/auth/login', {
      username: 'emilys',
      password: 'emilyspass'
    })
    expect(res.data).to.have.property('accessToken')
    expect(res.data.accessToken).to.be.a('string')
    expect(res.data.accessToken).to.not.be.empty
  })

  it('login gagal - wrong password', async () => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username: 'emilys',
        password: 'wrongpassword'
      })
    } catch (err) {
      //   console.log(err.response.data)
      expect(err.response.status).to.equal(400)
      expect(err.response.data).to.have.property('message')
    }
  })

  it('login gagal - wrong username', async () => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username: 'wronguser',
        password: 'emilyspass'
      })
    } catch (err) {
      //   console.log(err.response.data)
      expect(err.response.status).to.equal(400)
      expect(err.response.data).to.have.property('message')
    }
  })

  it('login gagal - empty credential', async () => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/login', {
        username: '',
        password: ''
      })
    } catch (err) {
      //   console.log(err.response.data)
      expect(err.response.status).to.equal(400)
      expect(err.response.data).to.have.property('message')
    }
  })

  it('akses protected endpoint pake token', async () => {
    // step 1 - login, ambil token
    const login = await axios.post('https://dummyjson.com/auth/login', {
      username: 'emilys',
      password: 'emilyspass'
    })
    const token = login.data.accessToken

    // step 2 - pake token untuk akses protected endpoint
    const res = await axios.get('https://dummyjson.com/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // console.log(res.data)
    expect(res.status).to.equal(200)
    expect(res.data.id).to.equal(1)
  })

  it('akses protected endpoint tanpa token', async () => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/me')
    } catch (err) {
      //   console.log(err.response.status)
      //   console.log(err.response.data)
      expect(err.response.status).to.equal(401)
    }
  })

  it('akses protected endpoint pake token salah', async () => {
    try {
      const res = await axios.post('https://dummyjson.com/auth/me', null, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.fake`
        }
      })
    } catch (err) {
      // console.log(err.response.status)
      // console.log(err.response.data)
      expect(err.response.status).to.be.oneOf([401, 500])
    }
  })
})
