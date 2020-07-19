// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
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
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "algosnips" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('algosnips.helloWorld', function () {
	// The code you place here will be executed every time your command is executed

	// Display a message box to the user
	// vscode.window.showInformationMessage('Hi this is algosnips!');
	// });

	// context.subscriptions.push(disposable);
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
