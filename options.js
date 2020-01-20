const { translations } = require('./locale')
const {
	display_single_description,
	display_word_and_definition,
	display_plain,
	display_json,
	display_version,
	display_help,
	include_comments,
	use_indentation,
	set_language
} = translations

const options = [{
	option: 'single',
	shorthand: 's',
	description: display_single_description
}, {
	option: 'minimal',
	shorthand: 'm',
	description: display_word_and_definition
}, {
	option: 'plain',
	shorthand: 'p',
	description: display_plain
},
{ linebreak: true },
{
	option: 'json',
	shorthand: 'j',
	description: display_json
}, {
	option: 'include-comments',
	shorthand: 'c',
	description: include_comments
}, {
	option: 'indent-json',
	shorthand: 'i',
	description: use_indentation
},
{ linebreak: true },
{
	option: 'language',
	shorthand: 'l',
	description: set_language
},
{
	option: 'version',
	shorthand: 'v',
	description: display_version
}, {
	option: 'help',
	shorthand: 'h',
	description: display_help
}]

module.exports = options
