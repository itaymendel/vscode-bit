import { CompletionItem, CompletionItemKind, TextDocument, TextEdit, Position, Range } from 'vscode';
import { State } from './State';

export class ComponentCompletionItem extends CompletionItem {
  range: Range;
  
  constructor(label: string, state: State, kind: CompletionItemKind) {
    super(label);
    this.kind = kind;
    this.insertText = label;
    this.range = this.importStringRange(state);
  }

  importStringRange({ textCurrentLine, cursorLine, cursorPosition }) : Range {
    const textToPosition = textCurrentLine.substring(0, cursorPosition);
    const quotationPosition = Math.max(textToPosition.lastIndexOf('\"'), textToPosition.lastIndexOf('\''));
    return new Range(cursorLine, quotationPosition + 1, cursorLine, cursorPosition)
  }
}

export function toCompletionItem(dependency: string, state: State, kind: CompletionItemKind) {
    return new ComponentCompletionItem(dependency, state, kind);
}