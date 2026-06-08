""
import { defineConfig } from '@playwright/test'

export default defineConfig({
    // Semua file test yang dicari
    testDir: './',
    testMatch: '**/*.test.ts',

    // Timeout per test
    timeout: 30000,

    // Laporan hasil test
    reporter: 'list',

    use: {
        // Base URL buat UI test nanti
        baseURL: 'https://www.saucedemo.com',

        // Buat API test
        extraHTTPHeaders: {
            'Content-Type': 'application/json'
        }
    },

    // Pisah project UI sama API
    projects: [
        {
            name: 'api-playwright',
            testDir: './api-tests/playwright',
            use: {}
        },
        {
            name: 'ui-tests',
            testDir: './ui-tests',
            use: {
                browserName: 'chromium',
                headless: false
            }
        }
    ]
})