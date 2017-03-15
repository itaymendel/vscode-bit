import { State } from '../State';
import { Position, Range } from 'vscode';

export default function shouldProvideVersion(state: State) {
    // TODO
    // try {
    //     const textUntilCursor = state.document.getText(new Range(new Position(1, 1), state.position));
    //     const textUntilLastObjectParent = textUntilCursor.slice(0, textUntilCursor.lastIndexOf('{'))
    //     const objectParentLine = textUntilLastObjectParent.slice(textUntilLastObjectParent.lastIndexOf('\n'));
    //     if (objectParentLine.indexOf('dependencies') === -1) return false;
    //     return true;
    // } catch (e) {
    //     return false;
    // }
}