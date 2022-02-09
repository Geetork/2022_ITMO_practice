// setting up modules
import express from 'express';
import * as bodyParser from 'body-parser';
import { ClientInstance } from '../models/clientInstance';

// creating router
export const artistsRouter = express.Router();

artistsRouter.use(bodyParser.json());

// setting up routes
artistsRouter.route('/')
  .get((req, res, next) => {
    (new ClientInstance()).getData('SELECT * FROM artists')
    .then(data => res.send(data));
  });

artistsRouter.route('/:artistId')
  .get((req, res, next) => {
    (new ClientInstance()).getData(`SELECT * FROM artists WHERE id = ${req.params.artistId};`)
    .then(data => res.send(data));
  });
