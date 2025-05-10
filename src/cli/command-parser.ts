type ParsedCommand = Record<string, string[]>

export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};
    let currentCommand = '';

    cliArguments.forEach((argument) => {
      if(argument.startsWith('--')){
        parsedCommand[argument] = [];
        currentCommand = argument;
      } else if(currentCommand && argument){
        parsedCommand[currentCommand].push(argument);
      }
    });

    return parsedCommand;
  }
}
