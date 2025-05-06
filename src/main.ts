#!/usr/bin/env npx tsx
import 'reflect-metadata';

import {HelpCommand, VersionCommand, ImportCommand, CLIApplication, GenerateCommand} from './cli';

function bootstrap() {
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
