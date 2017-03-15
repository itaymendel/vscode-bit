import { State } from '../State';
import { Config } from '../config';
import { fsf, FsFunctions } from '../fs-functions';
import { CompletionItem, CompletionItemKind } from 'vscode';
import { ComponentCompletionItem, toCompletionItem } from '../ComponentCompletionItem';
import { getComponentsFromComponentsDir } from '../bit-helpers';

export default function provideVersion(state: State, config: Config, fsf: FsFunctions) {
    // TODO (add latest as default)
    // return getComponentsFromComponentsDir(state, config, fsf)
    //     .then(dependencies => dependencies.map(d => toCompletionItem(d, state, CompletionItemKind.Snippet))
    //     );
}
