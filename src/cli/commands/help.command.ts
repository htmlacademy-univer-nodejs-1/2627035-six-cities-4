import {Command} from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void>{
    console.info(
      'Программа для подготовки данных для REST API сервера.\n' +
      `Пример: cli.js --<${ chalk.blue('commands') }> [${chalk.cyan('--arguments')}]\n\n` +
      'Команды:\n' +
      `${chalk.cyan('--version')}:                   ${chalk.magenta('# выводит номер версии')}\n` +
      `${chalk.cyan('--help')}:                      ${chalk.magenta('# печатает этот текст')}\n` +
      `${chalk.cyan('--import')} <path>:             ${chalk.magenta('# импортирует данные из TSV')}\n` +
      `${chalk.cyan('--generate')} <n> <path> <url>  ${chalk.magenta('# генерирует произвольное количество тестовых данных')}\n`
    );
  }
}
