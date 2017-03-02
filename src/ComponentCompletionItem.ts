import { CompletionItem, CompletionItemKind, TextDocument, TextEdit, Position, Range } from 'vscode';
import { State } from './State';

export class ComponentCompletionItem extends CompletionItem {  
  constructor(label: string, state: State) {
    super(label);
    this.kind = CompletionItemKind.File;
    this.textEdit = TextEdit.replace(this.importStringRange(state), label);
  }

  importStringRange({ textCurrentLine, cursorLine, cursorPosition }) : Range {
    const textToPosition = textCurrentLine.substring(0, cursorPosition);
    const quotationPosition = Math.max(textToPosition.lastIndexOf('\"'), textToPosition.lastIndexOf('\''));
    return new Range(cursorLine, quotationPosition + 1, cursorLine, cursorPosition)
  }
}