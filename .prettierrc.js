module.exports = {
	printWidth: 120,
	tabWidth: 2,
	semi: false,
	trailingComma: "none",
	singleQuote: true,
	endOfLine: "auto",
	plugins: [require('prettier-plugin-tailwindcss')] // adding explicitly, but it auloloads by default by most package managers
}