import { Command } from './command.interface';
import { TsvFileReader } from '../../shared/libs/file-reader/tsv-file-reader';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers';
import { UserService } from '../../shared/modules/user/user-service.interface.js';
import { CategoryModel, CategoryService, DefaultCategoryService } from '../../shared/modules/category';
import { DefaultOfferService, OfferModel, OfferService } from '../../shared/modules/offer';
import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client';
import { Logger } from '../../shared/libs/logger';
import { ConsoleLogger } from '../../shared/libs/logger/console.logger';
import { DefaultUserService, UserModel } from '../../shared/modules/user';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant';
import { Offer } from '../../shared/types';

export class ImportCommand implements Command {
  private userService: UserService;
  private categoryService: CategoryService;
  private offerService: OfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string = "salt";

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.categoryService = new DefaultCategoryService(this.logger, CategoryModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: Offer) {
    const categories: string[] = [];
    console.log(this.salt)
    const user = await this.userService.findOrCreate({
      ...offer.user,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    for (const { name } of offer.categories) {
      const existCategory = await this.categoryService.findByCategoryNameOrCreate(name, { name });
      categories.push(existCategory.id);
    }

    await this.offerService.create({
      categories,
      userId: user.id,
      title: offer.title,
      description: offer.description,
      image: offer.image,
      postDate: offer.postDate,
      price: offer.price,
      type: offer.type,
    });

  }

  public getName(): string {
    return '--import';
  }

  public async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
    const fileReader = new TsvFileReader(filename.trim());

    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      console.error(`Can't import data from file ${filename}`);
      console.error(getErrorMessage(error));
    }
  }
}
