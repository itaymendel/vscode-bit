import { State } from './State';
import { Config } from './config';
import { fsf, FsFunctions } from './fs-functions';
import { join, resolve } from 'path';
import { CompletionItem } from 'vscode';
import { ComponentCompletionItem } from './ComponentCompletionItem';
import * as repl from 'repl';

export function provide(state: State, config: Config, fsf: FsFunctions): Promise<CompletionItem[]> {
    return getBitComponents(state, config, fsf)
        .then(dependencies => dependencies.map(d => toCompletionItem(
            getBitLocalIdFromBitJson(d), state))
        );
    
    // TODO - add inline_components directory lookup
}

export function getBitComponents(state: State, config: Config, fsf: FsFunctions) {
    return fsf.readJson(getBitJson(state, config, fsf))
        .then(bitJson => Object.keys(bitJson.dependencies || {}))
         // TODO for compiler and tester
        .catch(() => []);
}

function removeBoxIfNeeded(localId) {
    if (localId.split('/')[0] === 'global') {
        return localId.slice(localId.indexOf('/') + 1);
    }

    return localId;
}

function getBitLocalIdFromBitJson(str: string): string {
    return removeBoxIfNeeded(str.slice(str.indexOf('/') + 1));
}

function getBuildInModules() : string[] {
    return (<any>repl)._builtinLibs;
}

function toCompletionItem(dependency: string, state: State) {
    return new ComponentCompletionItem(dependency, state);
}

function getBitJson(state: State, config: Config, fsf: FsFunctions) {
    return config.recursivePackageJsonLookup ?
        nearestBitJson(state.rootPath, state.filePath, fsf) :
        join(state.rootPath, 'bit.json');
}

function nearestBitJson(rootPath: string, currentPath: string, fsf: FsFunctions): string {
    const packageJsonFullPath = join(currentPath, 'bit.json');

    if (currentPath === rootPath || fsf.isFile(packageJsonFullPath)) {
        return packageJsonFullPath;
    }

    return nearestBitJson(rootPath, resolve(currentPath, '..'), fsf);
}

// TODO - change to read inline_components directory