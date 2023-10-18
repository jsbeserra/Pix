// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
	roots: ['<rootDir>/src', '<rootDir>/tests'],
	preset: 'ts-jest',
	verbose: true,
	transform: tsjPreset.transform,
	transformIgnorePatterns: ['^.+\\.js$'],
	testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
	resetMocks: true,
	moduleNameMapper: {
		'^@domain/(.*)$': '<rootDir>/src/domain/$1',
		'^@application/(.*)$': '<rootDir>/src/application/$1',
		'^@infra/(.*)$': '<rootDir>/src/infra/$1',
		'^@main/(.*)$': '<rootDir>/src/main/$1',
		'^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
		'^@shared/(.*)$': '<rootDir>/src/shared/$1',
		'^@test/(.*)$': '<rootDir>/tests/$1'
	},
	setupFiles: ['dotenv/config'],
}