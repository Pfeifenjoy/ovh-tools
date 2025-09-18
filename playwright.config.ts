import { defineConfig } from "@playwright/test"

export default defineConfig({
	testDir: "./test",
	timeout: 30000,
	use: {
		headless: true
	},
	projects: [
		{
			name: "node",
			testMatch: "**/*.test.ts"
		}
	]
})
