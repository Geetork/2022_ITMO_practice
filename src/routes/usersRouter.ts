// setting up modules
import express from 'express';
import * as bodyParser from 'body-parser';
import { ClientInstance } from '../models/clientInstance';

export const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.route('/')
  .get((req, res, next) => {
    res.send();
  })
  .post((req, res, next) => {
    res.send();
  });
