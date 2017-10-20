require('dotenv').config({path: './environments/.env'});
module.exports = {
	moduleFileExtensions: [
		'ts',
		'tsx',
		'js'
	],
	transform: {
		'\\.(ts|tsx)$': '<rootDir>/node_modules/ts-jest/preprocessor.js'
	},
	testRegex: '/e2e/.*spec\\.(ts|tsx|js)$'
};