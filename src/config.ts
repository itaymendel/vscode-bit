import { workspace } from 'vscode'

export interface Config {
    scanDevDependencies?: boolean,
    recursivePackageJsonLookup?: boolean,
}

export function getConfig() : Config {
    const configuration = workspace.getConfiguration('bit-intellisense');

    return {
        scanDevDependencies: configuration['scanDevDependencies'],
        recursivePackageJsonLookup: configuration['recursiveBitJsonLookup'],
    };
}