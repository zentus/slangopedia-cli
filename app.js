#!/usr/bin/env node
const Slangopedia = require('slangopedia')
const Chalk = require('chalk')
const pkg = require('./package')
const getHelpMessage = require('./cli.help.js')
const maybe = require('maybe-include')
const {
	config,
	searchTerm,
	option,
	capitalize,
	formatDate,
	getStars
} = require('./utils')
const { translations } = require('./locale')

const chalk = new Chalk.Instance({
	level: option('plain') ? 0 : 1
})

if (option('help')) {
	const helpMessage = getHelpMessage(chalk)
	return console.log(helpMessage)
} else if (option('version')) {
	return console.log(pkg.version)
} else if (option('language')) {
	const languageCode = config.set('languageCode', option('language').input)
	return console.log(`${translations.language_was_set_to} "${option('language').input}"`)
}


const getTemplate = results => {
	const { word, url } = results
	const orderByRating = definitions => definitions.sort((a, b) => a.rating.upvotePercentage > b.rating.upvotePercentage ? -1 : 1)
	const maybeSingleDefinition = definitions => option('single') ? definitions.slice(0, 1) : definitions
	const definitions = maybeSingleDefinition(orderByRating(results.definitions))

	const definitionsTemplate = definitions
		.map(({ author, content, example, rating, createdAt }, i) => {
			const formatted = {
				count: maybe(!option('single') && definitions.length > 1, chalk.bold(i + 1 + '. ')),
				word: chalk.bold.green(word.trim()),
				stars: maybe(!option('minimal'), `\n${getStars(rating.stars)}${rating.totalVotes ? '  ' : ''}(${rating.totalVotes} röster)`),
				content: `\n\n${chalk.yellow(content)}`,
				stamp: maybe(!option('minimal'), `\n\n${author} (${formatDate(createdAt)})`),
				example: maybe(!option('minimal'), `\n\n${chalk.italic(example)}`)
			}

			return `\n${formatted.count}${formatted.word}${formatted.stars}${formatted.content}${formatted.example}${formatted.stamp}\n`
		})
		.join('')

	return `${maybe(!option('minimal'), '\n' + url)}\n${definitionsTemplate}`.trim()
}

Slangopedia.search(searchTerm(), {
	random: !searchTerm(),
	includeComments: option('json') && option('include-comments')
})
	.then(results => {
		if (!results) {
			console.error(`${translations.could_not_find_the_word} "${searchTerm()}"`)
			return process.exit(1)
		}

		if (option('json')) {
			const jsonOutput = JSON.stringify(results, false, option('indent-json') && 2)
			return console.log(jsonOutput)
		}

		const template = getTemplate(results)

		console.log(template)
	})
