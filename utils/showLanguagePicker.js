const vscode = require('vscode')

const gists = require('./gists.json')

const showLanguagePicker = async (chosenAlgorithm) => {
	let languages = Object.keys(gists.algorithms[chosenAlgorithm.name].languages)

	const items = languages.map((lang) => ({
		label: lang,
		description: `${lang} language`,
		name: lang,
	}))
	const language = await vscode.window
		.showQuickPick(items, {
			placeHolder: 'Choose a langauge',
			matchOnDescription: true,
		})
		.catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
	return language
}

module.exports = showLanguagePicker
