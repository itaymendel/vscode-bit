import { CompletionItemProvider, TextDocument, Position, CompletionItem, CompletionItemKind, workspace } from 'vscode'
import { readFile, readdir, statSync } from 'fs';
import { dirname } from 'path';
import { ComponentCompletionItem } from './ComponentCompletionItem';
import { getConfig, Config } from './config';
import { shouldProvide } from './shouldProvide';
import { provide } from './provide';
import { State } from './State';
import { fsf } from './fs-functions';

export class BitIntellisense implements CompletionItemProvider {
    provideCompletionItems(document: TextDocument, position: Position): Thenable<CompletionItem[]> {    
        const state : State = {
            rootPath: workspace.rootPath,
            filePath: dirname(document.fileName),
            textCurrentLine: document.lineAt(position).text,
            cursorPosition: position.character,
            cursorLine: position.line
        };

        return shouldProvide(state) ? provide(state, getConfig(), fsf) : Promise.resolve([]);
    }
}