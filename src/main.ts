import {HelpCommand, VersionCommand, ImportCommand, CLIApplication, GenerateCommand} from './cli/index.js';

function bootstrap(){
  const cliApplication = new CLIApplication();
  cliApplication.registerCommand([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand()
  ]);

  cliApplication.processCommand(process.argv);
}

bootstrap();
