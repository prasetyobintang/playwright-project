""
import { test, expect } from '@playwright/test'

const BASE_URL = 'https://dummyjson.com'

// ============================================================
// LOGIN API
// ============================================================

test.describe('Login API - DummyJSON', () => {

    test('POST /login harusnya return 200', async ({ request }) => {
        const res = await request.post(`${BASE_URL}/auth/login`, {
            data: {
                username: 'emilys',
                password: 'emilyspass'
            }
        })

        expect(res.status()).toBe(200)

        const body = await res.json()
        expect(typeof body.id).toBe('number')
        expect(typeof body.username).toBe('string')
        expect(typeof body.email).toBe('string')
        expect(body.email).toContain('@')
        expect(typeof body.accessToken).toBe('string')
        expect(body.accessToken).not.toBe('')
    })

    test('response harus punya token', async ({ request }) => {
        const res = await request.post(`${BASE_URL}/auth/login`, {
            data: {
                username: 'emilys',
                password: 'emilyspass'
            }
        })

        const body = await res.json()
        expect(body).toHaveProperty('accessToken')
        expect(typeof body.accessToken).toBe('string')
        expect(body.accessToken).not.toBe('')
    })

    test('login gagal - wrong password', async ({ request }) => {
        const res = await request.post(`${BASE_URL}/auth/login`, {
            data: {
                username: 'emilys',
                password: 'wrongpassword'
            }
        })

        expect(res.status()).toBe(400)
        const body = await res.json()
        expect(body).toHaveProperty('message')
    })

    test('login gagal - wrong username', async ({ request }) => {
        const res = await request.post(`${BASE_URL}/auth/login`, {
            data: {
                username: 'wronguser',
                password: 'emilyspass'
            }
        })

        expect(res.status()).toBe(400)
        const body = await res.json()
        expect(body).toHaveProperty('message')
    })

    test('login gagal - empty credential', async ({ request }) => {
        const res = await request.post(`${BASE_URL}/auth/login`, {
            data: {
                username: '',
                password: ''
            }
        })

        expect(res.status()).toBe(400)
        const body = await res.json()
        expect(body).toHaveProperty('message')
    })

})

// ============================================================
// PROTECTED ENDPOINT
// ============================================================

test.describe('Protected Endpoint - DummyJSON', () => {

    test('akses protected endpoint pake token', async ({ request }) => {
        // step 1 - login, ambil token
        const login = await request.post(`${BASE_URL}/auth/login`, {
            data: {
                username: 'emilys',
                password: 'emilyspass'
            }
        })
        const { accessToken } = await login.json()

        // step 2 - pake token untuk akses protected endpoint
        const res = await request.get(`${BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        expect(res.status()).toBe(200)
        const body = await res.json()
        expect(body.id).toBe(1)
    })

    test('akses protected endpoint tanpa token', async ({ request }) => {
        const res = await request.get(`${BASE_URL}/auth/me`)

        expect(res.status()).toBe(401)
    })

    test('akses protected endpoint pake token salah', async ({ request }) => {
        const res = await request.post(`${BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.fake`
            }
        })

        expect([401, 500]).toContain(res.status())
    })

})

// ============================================================
// GET USERS
// ============================================================

test.describe('API Test - DummyJSON', () => {

    test('GET /users harusnya return status 200', async ({ request }) => {
        const res = await request.get(`${BASE_URL}/users`)

        expect(res.status()).toBe(200)
        const body = await res.json()
        expect(typeof body.users[0].id).toBe('number')
        // console.log(body.users[0])
    })

})