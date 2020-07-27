const vscode = require('vscode')
const got = require('got')

const fetchGist = async ({filename, gistId}) => {
	return vscode.window.withProgress(
		{
			title: `algosnips: fetching the code for the algorithm`,
			location: vscode.ProgressLocation.Notification,
			cancellable: true,
		},
		async (progress, token) => {
			token.onCancellationRequested(() => {
				console.debug('algosnips: fetch has been cancelled')
				return Promise.reject()
      })
			let res = await got(
				`https://gist.githubusercontent.com/HarshaVardhanNakkina/${gistId}/raw`
			).catch((err) => {
				vscode.window.showErrorMessage(err.message)
      })
			if (res.statusCode !== 200) {
				const message = `algosnips: An error occured`
				vscode.window.showErrorMessage(message)
				console.error(new Error(message))
				return false
			}

			const { body } = res

			if (body.length === 0) {
				vscode.window.showErrorMessage(
					`algosnips: sorry, ${filename} was not found`
				)
				return false
			}
			return body
		}
	)
}

module.exports = fetchGist