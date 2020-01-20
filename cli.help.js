const pkg = require('./package.json')
const table = require('table')
const options = require('./options')

const getOptionsTable = (options, chalk) => {
	const settings = {
		border: table.getBorderCharacters(`void`),
		columnDefault: {
			paddingLeft: 0,
			paddingRight: 6
		},
		drawHorizontalLine: () => {
			return false
		}
	}

	const headerRow = [
		chalk.bold.green('Option'),
		chalk.bold.green('Shorthand'),
		chalk.bold.green('Description')
	]

	const optionRows = options.map(({ option, shorthand, description, linebreak }) => linebreak ? ['', '', ''] : [
		`--${option}`,
		`-${shorthand}`,
		description
	])

	const optionsTable = [
		headerRow,
		...optionRows
	]

	return table.table(optionsTable, settings)
}

const getHelpMessage = chalk => {
	const header = `${chalk.bold('slangopedia-cli')} ${chalk.bold('v' + pkg.version)}`
	const optionsTable = getOptionsTable(options, chalk)

	const template = `
${header}

Usage:

${chalk.bold('$ slangopedia [word] [options]')}

${optionsTable}
`

	return template.trim()
}


module.exports = getHelpMessage
