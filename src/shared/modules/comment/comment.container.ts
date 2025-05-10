import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { CommentService } from './comment-service.interface';
import { Component } from '../../types';
import { CommentEntity, CommentModel } from './comment.entity';
import { DefaultCommentService } from './default-comment.service';
import CommentController from './comment.controller.js';
import {Controller} from "../../libs/rest";

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<CommentService>(Component.CommentService)
    .to(DefaultCommentService)
    .inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel)
    .toConstantValue(CommentModel);

  commentContainer.bind<Controller>(Component.CommentController)
    .to(CommentController).inSingletonScope();

  return commentContainer;
}
