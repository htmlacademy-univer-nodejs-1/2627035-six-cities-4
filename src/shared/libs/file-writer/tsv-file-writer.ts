import {createWriteStream, WriteStream} from 'node:fs';

import {FileWriter} from './file-writer.interface.js';

export class TsvFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filename: string) {
    this.stream = createWriteStream(filename, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true
    });
  }

  public async write(row: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${row}\n`);
    if (!writeSuccess) {
      return new Promise((resolve) => {
        this.stream.once('drain', resolve);
      });
    }

    return Promise.resolve();
  }
}
