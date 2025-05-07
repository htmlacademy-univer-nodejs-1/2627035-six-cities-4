import { inject, injectable } from 'inversify';
import { OfferService } from './offer-service.interface';
import { Component } from '../../types/index';
import { Logger } from '../../libs/logger/index';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
