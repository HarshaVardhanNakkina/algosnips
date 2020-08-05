const vscode = require('vscode')

const gists = require('./gists.json')

const showAlgorithmPicker = async () => {
	let algorithms = []
	for (const [algo, { description }] of Object.entries(gists.algorithms)) {
    algorithms.push({
      label: algo,
      name: algo,
      description
    })
  }
	const algorithm = await vscode.window
		.showQuickPick(algorithms, {
			placeHolder: 'Choose an algorithm',
			matchOnDescription: true,
		})
		.catch((err) => {
			vscode.window.showErrorMessage(err.message)
		})
	return algorithm
}

module.exports = showAlgorithmPicker
