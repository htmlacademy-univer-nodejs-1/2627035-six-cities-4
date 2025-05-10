import 'reflect-metadata';
import { Container } from 'inversify';

import { RestApplication } from './rest';
import { Component } from './shared/types';
import { createRestApplicationContainer } from './rest/container';
import { createUserContainer } from './shared/modules/user';
import { createCategoryContainer } from './shared/modules/category';
import { createOfferContainer } from './shared/modules/offer';


async function bootstrap() {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createCategoryContainer(),
    createOfferContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
