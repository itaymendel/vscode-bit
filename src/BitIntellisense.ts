import { CompletionItemProvider, TextDocument, Position, CompletionItem, CompletionItemKind, workspace } from 'vscode'
import { readFile, readdir, statSync } from 'fs';
import { dirname, basename } from 'path';
import { ComponentCompletionItem } from './ComponentCompletionItem';
import { getConfig, Config } from './config';
import { shouldProvideToJs, provideToJs } from './js-completions';
import { shouldProvideComponent, shouldProvideVersion, provideComponent, provideVersion } from './json-completions';
import { State } from './State';
import { fsf } from './fs-functions';

function isBitJson(document: TextDocument) {
	return document && basename(document.fileName) === 'bit.json';
}

export class BitIntellisense implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position): Thenable<CompletionItem[]> {    
        const currentLine = document.lineAt(position);
        const state : State = {
            document,
            position,
            rootPath: workspace.rootPath,
            filePath: dirname(document.fileName),
            textCurrentLine: currentLine.text,
            cursorPosition: position.character,
            cursorLine: position.line,
        };
        

        if (isBitJson(document)) {
            if (shouldProvideComponent(state)) {
                return provideComponent(state, getConfig(), fsf);
            }

            if (shouldProvideVersion(state)) { // TODO
                // return provideVersion(state, getConfig(), fsf); // TODO
            }

            return Promise.resolve([]);
        }

        return shouldProvideToJs(state) ? provideToJs(state, getConfig(), fsf) : Promise.resolve([]);
    }
}