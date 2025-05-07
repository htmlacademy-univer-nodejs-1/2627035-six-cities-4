import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types';
import { CategoryService } from './category-service.interface.js';
import { DefaultCategoryService } from './category.service';
import { CategoryEntity, CategoryModel } from './category.entity';

export function createCategoryContainer() {
  const categoryContainer = new Container();

  categoryContainer.bind<CategoryService>(Component.CategoryService).to(DefaultCategoryService);
  categoryContainer.bind<types.ModelType<CategoryEntity>>(Component.CategoryModel).toConstantValue(CategoryModel);

  return categoryContainer;
}
