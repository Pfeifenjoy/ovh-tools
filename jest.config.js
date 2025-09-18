export default {
	preset: "ts-jest/presets/default-esm",
	extensionsToTreatAsEsm: [".ts"],
	testMatch: ["**/test/**/*.test.ts"],
	transform: {
		"^.+\\.ts$": ["ts-jest", { useESM: true }]
	}
}
