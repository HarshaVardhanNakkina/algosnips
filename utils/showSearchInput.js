const vscode = require('vscode')

const showSearchInput = async () => {
	let searchStr = await vscode.window
		.showInputBox({
			placeHolder: `Example: mergesort, binarysearch, reverse a string etc...`,
			prompt: 'Search for an algorithm snippet'
		})
		.catch(err => {
			vscode.window.showErrorMessage(err.message)
		})
	return searchStr
}

module.exports = showSearchInput
