import {commands} from './commands.ts';
import {readLineInterface} from './consts.ts';

const start = async () => {
  commands['--help']();

  readLineInterface.on('line', async (input: string) => {
    const [command , ...params] = input.split(' ');
    await commands[command as keyof typeof commands]?.(...params);
  });
};

start();
