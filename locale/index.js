const pkg = require('../package.json')
const Configstore = require('configstore')
const en = require('./en')
const sv = require('./sv')
const config = new Configstore(pkg.name)

const languages = {
	en,
	sv
}

const getTranslations = () => {
	const defaultLanguageCode = 'en'
	const languageCode = config.get('languageCode') || defaultLanguageCode
	const language = languages[languageCode] || languages[defaultLanguageCode]

	return language
}

const translations = getTranslations()

module.exports = {
	getTranslations,
	translations
}
