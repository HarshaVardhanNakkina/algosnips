const vscode = require('vscode')

const showAlgorithmPicker = async (algorithms) => {
  const items = algorithms.map((algo) => ({
		label: algo,
		description: `${algo} algorithm`,
		name: algo,
	}))
	const algorithm = await vscode.window
		.showQuickPick(items, {
			placeHolder: 'Choose an algorithm',
			matchOnDescription: true,
		})
		.catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
	return algorithm
}

module.exports = showAlgorithmPicker