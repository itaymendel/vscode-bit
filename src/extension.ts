'use strict';
'use strict';
import { ExtensionContext, languages, workspace, commands, window } from 'vscode';
import { BitIntellisense } from './BitIntellisense';
// import { onImportCommand } from './command-import';

const onImportCommand = () => {
    return window.showInformationMessage('Import command!');
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "bit-intellisense" is now active!');

	if (workspace.rootPath) {
		const provider = new BitIntellisense();
		const jsTriggers = ['"', '\'', '/'];
		const jsSelector = ['typescript', 'javascript', 'javascriptreact', 'typescriptreact'];
		context.subscriptions.push(languages.registerCompletionItemProvider(jsSelector, provider, ...jsTriggers));
		
		const jsonTriggers = ['"', '/'];
		const jsonSelector = ['json'];
		context.subscriptions.push(languages.registerCompletionItemProvider(jsonSelector, provider, ...jsonTriggers));
	}
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log('bit-intellisense deactivate');
}