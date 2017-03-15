import { State } from '../State';
import { Config } from '../config';
import { fsf, FsFunctions } from '../fs-functions';
import { CompletionItem, CompletionItemKind } from 'vscode';
import { ComponentCompletionItem, toCompletionItem } from '../ComponentCompletionItem';
import { getComponentsFromJsonAndInline } from '../bit-helpers';

export default function provideToJs(state: State, config: Config, fsf: FsFunctions): Promise<CompletionItem[]> {
    return getComponentsFromJsonAndInline(state, config, fsf)
        .then(dependencies => dependencies.map(d => toCompletionItem(d, state, CompletionItemKind.File))
        );
}
