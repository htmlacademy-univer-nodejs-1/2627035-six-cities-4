import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import {
  BaseController,
  HttpError,
  HttpMethod,
  RequestQuery,
  ValidateObjectIdMiddleware,
  ValidateDtoMiddleware
} from '../../libs/rest';
import { Logger } from '../../libs/logger';
import { Component } from '../../types';
import { CategoryService } from './category-service.interface.js';
import { fillDTO } from '../../helpers';
import { CategoryRdo } from './rdo/category.rdo.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { OfferRdo, OfferService } from '../offer';
import { ParamCategoryId } from './type/param-categoryid.type.js';


@injectable()
export class CategoryController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CategoryService) private readonly categoryService: CategoryService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CategoryController…');

    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCategoryDto)]
    });
    this.addRoute({
      path: '/:categoryId/offers',
      method: HttpMethod.Get,
      handler: this.getOffersFromCategory,
      middlewares: [new ValidateObjectIdMiddleware('categoryId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const categories = await this.categoryService.find();
    const responseData = fillDTO(CategoryRdo, categories);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateCategoryDto>,
    res: Response
  ): Promise<void> {

    const existCategory = await this.categoryService.findByCategoryName(body.name);

    if (existCategory) {
      throw new HttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        `Category with name «${body.name}» exists.`,
        'CategoryController'
      );
    }

    const result = await this.categoryService.create(body);
    this.created(res, fillDTO(CategoryRdo, result));
  }

  public async getOffersFromCategory(
    { params, query } : Request<ParamCategoryId, unknown, unknown, RequestQuery>,
    res: Response,
  ):Promise<void> {
    const offers = await this.offerService.findByCategoryId(params.categoryId, query.limit);
    this.ok(res, fillDTO(OfferRdo, offers));
  }
}
