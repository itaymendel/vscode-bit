import { State } from '../State';

export default function shouldProvideToJs(state: State) {
    return isBitLoadFunc(state.textCurrentLine, state.cursorPosition)
        && !startsWithADot(state.textCurrentLine, state.cursorPosition);
}

function isBitLoadFunc(textCurrentLine: string, position: number): boolean  {
  return textCurrentLine.indexOf('bit(') != -1;
}

function startsWithADot(textCurrentLine: string, position: number) {
    const textWithinString = getTextWithinString(textCurrentLine, position);
    return textWithinString 
        && textWithinString.length > 0 
        && textWithinString[0] === '.';
}

function getTextWithinString(text: string, position: number): string {
    const textToPosition = text.substring(0, position);
    const quoatationPosition = Math.max(textToPosition.lastIndexOf('\"'), textToPosition.lastIndexOf('\''));
    return quoatationPosition != -1 ? textToPosition.substring(quoatationPosition + 1, textToPosition.length) : undefined;
}