import { TextDocument, Position } from 'vscode';

export interface State {
    rootPath: string,
    filePath: string,
    document: TextDocument,
    position: Position,
    textCurrentLine: string,
    cursorPosition: number,
    cursorLine: number,
}