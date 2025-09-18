import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import pluginPrettier from "eslint-plugin-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"

export default [
	{
		ignores: ["dist/**/*"]
	},
	js.configs.recommended,
	...tseslint.configs.recommended,

	{
		languageOptions: {
			globals: globals.node
		},
		plugins: {
			prettier: pluginPrettier,
			import: importPlugin
		},
		rules: {
			"prettier/prettier": "error",
			"import/order": [
				"error",
				{
					groups: [
						"builtin",
						"external",
						"internal",
						["parent", "sibling", "index"],
						"object",
						"type"
					],
					"newlines-between": "always", // Require blank line between groups
					alphabetize: {
						order: "asc", // Sort imports alphabetically
						caseInsensitive: true
					}
				}
			]
		}
	},

	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tseslint.parser
		}
	},

	eslintConfigPrettier
]
