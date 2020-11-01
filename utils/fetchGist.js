const vscode = require('vscode')
const got = require('got')
const Cache = require('vscode-cache')

const gists = require('./gists.json')
const settings = require('../settings')

const fetchGist = async (chosenAlgorithm, chosenLanguage) => {
	let snippetCache = new Cache(settings.context, 'snippets')
	const { name: algo } = chosenAlgorithm
	const { name: lang } = chosenLanguage

	if (snippetCache.has(algo)) {
		let algoCache = snippetCache.get(algo)
		if (algoCache[lang] && algoCache[lang].length > 0) return algoCache[lang]

		algoCache = { ...algoCache, [lang]: '' }
		snippetCache.put(algo, algoCache, settings.cacheTime ? settings.cacheTime : 21600)
	} else {
		snippetCache.put(algo, { [lang]: '' }, settings.cacheTime ? settings.cacheTime : 21600)
	}

	const { gistId } = gists.algorithms[algo]
	const { filename } = gists.algorithms[algo].languages[lang]
	const { baseUrl } = settings
	return vscode.window.withProgress(
		{
			title: `algosnips: fetching the code for the algorithm`,
			location: vscode.ProgressLocation.Notification,
			cancellable: true
		},
		async (progress, token) => {
			token.onCancellationRequested(() => {
				console.debug('algosnips: fetch has been cancelled')
				return Promise.reject()
			})
			let res = await got(`${baseUrl}/${gistId}/raw/${filename}`).catch(err => {
				vscode.window.showErrorMessage(err.message)
			})
			if (res.statusCode !== 200) {
				const message = `algosnips: An error occured`
				vscode.window.showErrorMessage(message)
				console.error(new Error(message))
				return false
			}

			const { body } = res

			if (body.length === 0) {
				vscode.window.showErrorMessage(`algosnips: sorry, ${filename} was not found`)
				return false
			}

			let algoCache = snippetCache.get(algo)
			algoCache = { ...algoCache, [lang]: body }
			snippetCache.put(algo, algoCache, settings.cacheTime ? settings.cacheTime : 21600)
			return body
		}
	)
}

module.exports = fetchGist
