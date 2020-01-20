const Configstore = require('configstore')
const pkg = require('./package.json')
const options = require('./options')
const argv = process.argv.slice(2)

const searchTerm = () => argv[0] && !argv[0].startsWith('-') && argv[0]

const option = optionInput => {
	const optionItem = options.find(({ option, shorthand }) => option === optionInput || shorthand === optionInput)

	if (!optionItem) return false

	const passedFlag = argv.find(flag =>
		flag === `--${optionItem.option}` ||
		flag === `-${optionItem.shorthand}`
	)

	return passedFlag && {
		input: argv[argv.indexOf(passedFlag) + 1] || ''
	}
}

const capitalize = string => string[0].toUpperCase() + string.slice(1)

const formatDate = unixTimestamp => {
	const date = new Date(unixTimestamp)

	return capitalize(date.toLocaleString('sv-SE', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	}))
}

const getStars = stars => ([...new Array(5).keys()])
	.map(i => {
		return stars >= i  ? '★' : '☆'
	})
	.join(' ')


const config = new Configstore(pkg.name)

module.exports = {
	config,
	searchTerm,
	option,
	capitalize,
	formatDate,
	getStars
}
