//import got from 'got';
import axios from 'axios';

import {MockServerData} from '../../shared/types';
import {TsvFileWriter} from '../../shared/libs/file-writer';
import {TsvOfferGenerator} from '../../shared/libs/offer-generator';

import {Command} from './command.interface.js';

export class GenerateCommand implements Command {
  private initialData?: MockServerData;

  private async load(url: string) {
    try {
      this.initialData = (await axios.get(url)).data;
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write (filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData as MockServerData);
    const tsvFileWriter = new TsvFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);

      console.info(`File ${filepath} was created`);
    } catch (error) {
      console.error('Can\'t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
