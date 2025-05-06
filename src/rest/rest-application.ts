import { inject, injectable } from 'inversify';
import { Logger } from '../shared/libs/logger';
//import { Config, RestSchema } from '../shared/libs/config';
import { Component } from '../shared/types';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger)
    private readonly logger: Logger,
    // @inject(Component.Config)
    // private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
  }
}
