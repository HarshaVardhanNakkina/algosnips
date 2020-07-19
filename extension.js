const vscode = require('vscode')

// UTILS
const gists = require('./utils/gists.json')
const showSearchInput = require('./utils/showSearchInput')
const showLanguagePicker = require('./utils/showLanguagePicker')

/**
 * this method is called when your extension is activated
 * your extension is activated the very first time the command is executed
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.commands.registerCommand('algosnips.search', async () => {
		// Show search bar to search for a snippet
		let searchStr = await showSearchInput().catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
		if (!searchStr || !searchStr.trim().length) {
			vscode.window.showErrorMessage('Received an empty search string')
			return
		}

		// once the search string is obtained,
		// let the user choose a language
		let language = await showLanguagePicker(gists.languages).catch((err) => {
			vscode.window.showErrorMessage(err.message)
    })
    if(!language)
      vscode.window.showErrorMessage("invalid language choice")
	})
}
exports.activate = activate

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
