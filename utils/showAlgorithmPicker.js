const vscode = require('vscode')
const Cache = require('vscode-cache')

const gists = require('./gists.json')
const settings = require('../settings')

const showAlgorithmPicker = async () => {
	let algorithms = []
	for (const [algo, { description }] of Object.entries(gists.algorithms)) {
    algorithms.push({
      label: algo,
      name: algo,
      description
    })
  }
	const algorithm = await vscode.window
		.showQuickPick(algorithms, {
			placeHolder: 'Choose an algorithm',
			matchOnDescription: true,
		})
		.catch((err) => {
			vscode.window.showErrorMessage(err.message)
    })
  let snippetCache = new Cache(settings.context, 'snippets')
  if (!snippetCache.has(algorithm.name)) {
    snippetCache.put(algorithm.name, {}, settings.cacheTime ? settings.cacheTime : 21600)
  }
	return algorithm
}

module.exports = showAlgorithmPicker
