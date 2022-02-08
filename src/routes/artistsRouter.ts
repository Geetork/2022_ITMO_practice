// setting up modules
import express from 'express';
import * as bodyParser from 'body-parser';

// creating router
export const artistsRouter = express.Router();

artistsRouter.use(bodyParser.json());

// setting up routes
artistsRouter.route('/')
  .get((req, res, next) => {
    return res.send('okey');
  });

artistsRouter.route('/:artistId')
  .get((req, res, next) => {
    return res.send(req.params.artistId);
  });
