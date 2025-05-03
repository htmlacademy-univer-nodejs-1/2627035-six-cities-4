import readline from 'node:readline';

export const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
