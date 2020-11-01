const vscode = require('vscode')
const Cache = require('vscode-cache')

const gists = require('./gists.json')
const settings = require('../settings')

const showLanguagePicker = async ({ name: algo }) => {
	let languages = Object.keys(gists.algorithms[algo].languages)

	const items = languages.map(lang => ({
		label: lang,
		name: lang,
		description: `${lang} language`
	}))

	const language = await vscode.window
		.showQuickPick(items, {
			placeHolder: 'Choose a language',
			matchOnDescription: true
		})
		.catch(err => {
			console.debug('Error: ', err)
			vscode.window.showErrorMessage(err.message)
		})

	let snippetCache = new Cache(settings.context, 'snippets')
	if (snippetCache.has(algo)) {
		let algoCache = snippetCache.get(algo)
		if (!algoCache[language.name]) {
			algoCache = { ...algoCache, [language.name]: '' }
			snippetCache.put(algo, algoCache, settings.cacheTime ? settings.cacheTime : 21600)
		}
	} else {
		snippetCache.put(
			algorithm.name,
			{ [language.name]: '' },
			settings.cacheTime ? settings.cacheTime : 21600
		)
	}

	return language
}

module.exports = showLanguagePicker
