const vscode = require('vscode')

const hasTextEditor = () => {
	return (
		vscode.window.activeTextEditor &&
		vscode.window.activeTextEditor.document.uri !== 'output'
	)
}

module.exports = hasTextEditor
