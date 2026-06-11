# playwright-project

A personal QA automation portfolio project covering API testing with multiple frameworks and UI testing using Playwright and TypeScript.

---

## Tech Stack

- **Playwright** (TypeScript) — UI & API Testing
- **Mocha** — Test Runner
- **Chai** — Assertion Library
- **Axios** — HTTP Client
- **Node.js**

---

## Project Structure

```
playwright-project/
├── api-tests/
│   ├── mocha-chai/         # API Testing with Mocha, Chai, Axios
│   │   ├── api.test.js
│   │   ├── contoh.test.js
│   │   └── login.test.js
│   └── playwright/         # API Testing with Playwright Native
│       └── login.test.ts
├── ui-tests/               # UI Testing (coming soon)
├── playwright.config.ts
├── package.json
└── .gitignore
```

---

## Test Coverage

### API Testing — Mocha Chai Axios (`api-tests/mocha-chai/`)

#### Login API (`login.test.js`)
- ✅ POST /auth/login — successful login, return 200
- ✅ Response contains access token
- ❌ Login with wrong password
- ❌ Login with wrong username
- ❌ Login with empty credentials
- ✅ Access protected endpoint with valid token
- ❌ Access protected endpoint without token
- ❌ Access protected endpoint with invalid token

#### General API (`api.test.js`)
- ✅ GET /users — return 200 and validate response structure

### API Testing — Playwright Native (`api-tests/playwright/`)

#### Login API (`login.test.ts`)
Recreated from `login.test.js` using Playwright's native request context:
- ✅ POST /auth/login — successful login, return 200
- ✅ Response contains access token
- ❌ Login with wrong password
- ❌ Login with wrong username
- ❌ Login with empty credentials
- ✅ Access protected endpoint with valid token
- ❌ Access protected endpoint without token
- ❌ Access protected endpoint with invalid/malformed token

---

## API Used

[DummyJSON](https://dummyjson.com) — Fake REST API for testing and prototyping

---

## Installation

```bash
npm install
npx playwright install chromium
```

## Run Tests

```bash
# Run Mocha Chai tests
npx mocha api-tests/mocha-chai/login.test.js

# Run Playwright API tests
npx playwright test --project=api-playwright

# Run all Playwright tests
npx playwright test
```

---

## Key Differences: Mocha Chai Axios vs Playwright API

| | Mocha Chai Axios | Playwright Native |
|---|---|---|
| Language | JavaScript | TypeScript |
| HTTP Client | Axios | Playwright Request |
| Assertion | Chai (`to.equal`) | Jest-style (`toBe`) |
| Body Access | `res.data` (auto-parsed) | `await res.json()` (manual parse) |
| Status | `res.status` | `res.status()` |

---

![Playwright](https://img.shields.io/badge/Test-Playwright-green)
![Mocha](https://img.shields.io/badge/Test-Mocha-brown)
![Chai](https://img.shields.io/badge/Assertion-Chai-red)
![Axios](https://img.shields.io/badge/HTTP-Axios-blue)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)
