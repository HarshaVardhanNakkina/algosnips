const vscode = require('vscode')

const showSearchInput = async () => {
	let searchStr = await vscode.window
		.showInputBox({
			placeHolder: `Example: mergesort, binarysearch, reversestring etc...`,
			prompt: 'Search for a snippet',
		})
		.catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
	return searchStr
}

module.exports = showSearchInput
