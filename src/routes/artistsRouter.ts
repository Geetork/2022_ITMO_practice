// setting up modules
import express from 'express';
import * as bodyParser from 'body-parser';
import { ArtistController } from '../controllers/artistController';

// creating router
export const artistsRouter = express.Router();

artistsRouter.use(bodyParser.json());

// setting up routes
artistsRouter.route('/')
  .get((req, res, next) => {
    (new ArtistController()).getAll()
    .then(data => res.send(data));
  });

artistsRouter.route('/:artistId')
  .get((req, res, next) => {
    const id = parseInt(req.params.artistId);
    (new ArtistController()).getById(id)
    .then(data => res.send(data));
  });
