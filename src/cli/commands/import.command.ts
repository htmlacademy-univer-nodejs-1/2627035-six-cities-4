import {TsvFileReader} from '../../shared/libs/file-reader/tsv-file-reader.ts';
import {createOffer, getErrorMessage} from '../../shared/helpers';

import {Command} from './command.interface.js';

export class ImportCommand implements Command {
  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported`);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      if (!(error instanceof Error)){
        throw error;
      }

      console.error(`Can't import data from file ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
