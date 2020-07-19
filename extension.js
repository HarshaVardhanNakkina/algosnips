const vscode = require('vscode')

// UTILS
const gists = require('./utils/gists.json')
const showAlgorithmPicker = require('./utils/showAlgorithmPicker')
const showLanguagePicker = require('./utils/showLanguagePicker')

/**
 * this method is called when your extension is activated
 * your extension is activated the very first time the command is executed
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.commands.registerCommand('algosnips.search', async () => {
		// Show search bar to choose an algorithm
		let chosenAlgorithm = await showAlgorithmPicker(
			Object.keys(gists.algorithms)
		).catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
		if (!chosenAlgorithm) {
			vscode.window.showErrorMessage('invalid algorithm choice')
			return
		}

		// once the algorithm is chose,
		// let the user choose a language
		let language = await showLanguagePicker(
			Object.keys(gists.algorithms[chosenAlgorithm.name])
		).catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
    if (!language) vscode.window.showErrorMessage('invalid language choice')
    
    
	})
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
