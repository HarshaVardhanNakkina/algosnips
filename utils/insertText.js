const vscode = require('vscode');

const insertText = async text => {
  let textEditor = vscode.window.activeTextEditor

  // Ignore if no active TextEditor
  if (typeof (textEditor) === 'undefined') {
    vscode.window.showErrorMessage('no active text editor found')
    return false
  }

  // Get the active text document's uri
  let uri = textEditor.document.uri

  // Create a new TextEdit for each selection
  let edits = []
  for (let selection of textEditor.selections) {
    edits.push(vscode.TextEdit.insert(selection.active, text))
  }

  // New WorkspaceEdit
  let edit = new vscode.WorkspaceEdit()
  edit.set(uri, edits)

  // Applying the WorkspaceEdit
  await vscode.workspace.applyEdit(edit)

  // Clear the selection
  textEditor.selection = new vscode.Selection(textEditor.selection.end, textEditor.selection.end)

  return true
}
module.exports = insertText