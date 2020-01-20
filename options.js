const options = [{
	option: 'single',
	shorthand: 's',
	description: 'Display a single definition'
}, {
	option: 'minimal',
	shorthand: 'm',
	description: 'Display word and definition content only'
}, {
	option: 'plain',
	shorthand: 'p',
	description: 'Display without text formatting'
},
{ linebreak: true },
{
	option: 'json',
	shorthand: 'j',
	description: 'Display result in JSON format'
}, {
	option: 'include-comments',
	shorthand: 'c',
	description: 'Include comments in JSON output (only applicable together with --json)'
}, {
	option: 'indent-json',
	shorthand: 'i',
	description: 'Use indentation in JSON output (only applicable together with --json)'
},
{ linebreak: true },
{
	option: 'version',
	shorthand: 'v',
	description: 'Display version number'
}, {
	option: 'help',
	shorthand: 'h',
	description: 'Display help message'
}]

module.exports = options
