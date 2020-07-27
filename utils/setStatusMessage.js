const vscode = require('vscode')

const setStatusMessage = (msg) => {
  vscode.window.setStatusBarMessage(`algosnips: ${msg}`)
}

module.exports = setStatusMessage