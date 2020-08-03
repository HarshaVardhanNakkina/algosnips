const vscode = require('vscode')

// UTILS
const gists = require('./utils/gists.json')
const showAlgorithmPicker = require('./utils/showAlgorithmPicker')
const showLanguagePicker = require('./utils/showLanguagePicker')
const fetchGist = require('./utils/fetchGist')
const showActionPicker = require('./utils/showActionPicker')

/**
 * this method is called when your extension is activated
 * your extension is activated the very first time the command is executed
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.commands.registerCommand('algosnips.search', async () => {
		// Show search bar to choose an algorithm
		let chosenAlgorithm = await showAlgorithmPicker().catch(err => {
			vscode.window.showErrorMessage(err.message)
		})
		if (!chosenAlgorithm) {
			vscode.window.showErrorMessage('invalid algorithm choice')
			return
		}
		// once the algorithm is chosen,
		// let the user choose a language
		let chosenLanguage = await showLanguagePicker(chosenAlgorithm).catch(
			err => {
				vscode.window.showErrorMessage(err.message)
			}
		)
		if (!chosenLanguage) {
			vscode.window.showErrorMessage('invalid language choice')
			return
		}

		let fetchedGist = await fetchGist(chosenAlgorithm, chosenLanguage).catch(
			err => {
				vscode.window.showErrorMessage(err.message)
			}
		)
		if (!fetchedGist || fetchedGist.length == 0) {
			vscode.window.showErrorMessage(
				`unable to find gist for ${chosenAlgorithm.name} in ${chosenLanguage.name}`
			)
			return
    }
    showActionPicker(fetchedGist)
    
	})
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
