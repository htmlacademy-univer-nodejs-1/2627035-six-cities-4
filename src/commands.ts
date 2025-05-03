import chalk from 'chalk';
import fs from 'node:fs';
import {version} from '../package.json';
import {readLineInterface} from './consts.ts';

const printVersion = () => readLineInterface.write(`${version}\n`);

const printHelp = () => readLineInterface.write(
  'Программа для подготовки данных для REST API сервера.\n' +
  `Пример: cli.js --<${ chalk.blue('command') }> [${chalk.cyan('--arguments')}]\n\n` +
  'Команды:\n' +
  `${chalk.cyan('--version')}:                   ${chalk.magenta('# выводит номер версии')}\n` +
  `${chalk.cyan('--help')}:                      ${chalk.magenta('# печатает этот текст')}\n` +
  `${chalk.cyan('--import')} <path>:             ${chalk.magenta('# импортирует данные из TSV')}\n` +
  `${chalk.cyan('--generate')} <n> <path> <url>  ${chalk.magenta('# генерирует произвольное количество тестовых данных')}\n`
);

const importFile = (path: string) => {
  if(!path){
    return;
  }

  fs.readFile(path, 'utf8', (err, data) => {
    if(err){
      return;
    }
    console.log(data);
  });
};

export const commands: Record<string, (...params: string[]) => void> = {
  '--version': printVersion,
  '--help': printHelp,
  '--import': importFile,
  '--generate': () => {},
};
