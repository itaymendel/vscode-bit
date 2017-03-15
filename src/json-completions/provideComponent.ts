import { State } from '../State';
import { Config } from '../config';
import { fsf, FsFunctions } from '../fs-functions';
import { CompletionItem, CompletionItemKind } from 'vscode';
import { ComponentCompletionItem, toCompletionItem } from '../ComponentCompletionItem';
import { getComponentsFromComponentsDir } from '../bit-helpers';

export default function provideComponent(state: State, config: Config, fsf: FsFunctions): Promise<CompletionItem[]> {
    return getComponentsFromComponentsDir(state, config, fsf)
        .then(dependencies => dependencies.map(d => toCompletionItem(d, state, CompletionItemKind.Snippet))
        );
}
