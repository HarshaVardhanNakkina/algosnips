const vscode = require('vscode')

const hasTextEditor = require('./hasTextEditor')
const insertText = require('./insertText')

const showActionPicker = async fetchedGist => {
	let actions = []

	// insert the algorithm into current document
	if (hasTextEditor()) {
		actions.push({
			label: `Insert the algorithm into document, here`,
			callback: () => {
				insertText(fetchedGist)
			}
		})
	}

	// copy to clipboard
	actions.push({
		label: `Copy the algorithm to clipboard`,
		callback: () => {
			vscode.env.clipboard.writeText(fetchedGist)
			vscode.window.showInformationMessage('Algorithm copied to clipboard')
		}
	})

	// create new document with the algorithm
	actions.push({
		label: `Insert the algorithm into new document`,
		callback: async () => {
			const document = await vscode.workspace.openTextDocument({
				content: fetchedGist
			})
			vscode.window.showTextDocument(document)
		}
	})

	const chosenAction = await vscode.window.showQuickPick(actions, {
		placeHolder: `Pick an action to perform`
	})

	if (typeof chosenAction === 'undefined') {
		vscode.window.showErrorMessage(`invalid choice`)
		return
	}
	chosenAction.callback()
}
module.exports = showActionPicker
