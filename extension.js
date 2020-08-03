const vscode = require('vscode')

// UTILS
const gists = require('./utils/gists.json')
const showAlgorithmPicker = require('./utils/showAlgorithmPicker')
const showLanguagePicker = require('./utils/showLanguagePicker')
const fetchGist = require('./utils/fetchGist')

/**
 * this method is called when your extension is activated
 * your extension is activated the very first time the command is executed
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.commands.registerCommand('algosnips.search', async () => {
		// Show search bar to choose an algorithm
		let chosenAlgorithm = await showAlgorithmPicker().catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
		if (!chosenAlgorithm) {
			vscode.window.showErrorMessage('invalid algorithm choice')
			return
    }
		// once the algorithm is chosen,
		// let the user choose a language
		let chosenLanguage = await showLanguagePicker(
			Object.keys(gists.algorithms[chosenAlgorithm.name])
		).catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
		if (!chosenLanguage) {
			vscode.window.showErrorMessage('invalid language choice')
			return
		}
		let gistToFetch =
			gists.algorithms[chosenAlgorithm.name][chosenLanguage.name]
		let fetchedGist = await fetchGist(gistToFetch).catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
	})
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
