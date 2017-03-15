import * as glob from 'glob';
import { State } from '../State';
import { Config } from '../config';
import { fsf, FsFunctions } from '../fs-functions';
import { join, resolve, sep } from 'path';
import { CompletionItem } from 'vscode';
import { ComponentCompletionItem } from '../ComponentCompletionItem';
import * as repl from 'repl';
import { uniq_fast } from '../utils';

export default function getComponentsFromComponentsDir(state: State, config: Config, fsf: FsFunctions): Promise<Array<string>> {
  return new Promise((resolve, reject) => {
    return glob('*/*/*/*', { cwd: getComponents(state) }, (err, files) => {
      if (err) return reject(err);
      return resolve(files.map(transformToDependencyObject));
    });
  });
}

function getComponents(state: State) {
  return join(state.rootPath, 'components');
}

function transformToDependencyObject(path) {
  const [ name, box, scope, version ] = path.split(sep);
  
  return `${scope}/${box}/${name}`;
}