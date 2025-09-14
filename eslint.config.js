import js from "@eslint/js"
import prettier from "eslint-config-prettier"
import importPlugin from "eslint-plugin-import"
import pluginPrettier from "eslint-plugin-prettier"

export default [
	js.configs.recommended,

	{
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

	prettier
]
