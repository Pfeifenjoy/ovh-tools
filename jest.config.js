export default {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/test/**/*.test.ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1"
	},
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov", "html"],
	collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/bin.ts"]
}
