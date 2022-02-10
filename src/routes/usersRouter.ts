// setting up modules
import express from 'express';
import * as bodyParser from 'body-parser';
import { UserController } from '../controllers/userController';

export const usersRouter = express.Router();

usersRouter.use(bodyParser.json());

usersRouter.route('/signup')
  .get((req, res, next) => {
    res.send();
  })
  .post((req, res, next) => {
    let userController = new UserController();
    userController.findUser(req.body.username, req.body.password)
    .then(user => {
      if (!user) {
        userController.createUser(req.body.username, req.body.password)
        .then(user => {
          userController.addUser(user);
          req.session.user = 'authenticated';
          res.redirect('/artists');
        });
      } else {
        let err = new Error(`User ${req.body.username} already exists!`);
        next(err);
      };
    })
    .catch(err => next(err));
  });

usersRouter.route('/signin')
  .get((req, res, next) => {
    res.send();
  })
  .post((req, res, next) => {
    let userController = new UserController();
    userController.findUser(req.body.username, req.body.password)
    .then(user => {
      if (user) {
        req.session.user = 'authenticated';
        res.redirect('/artists');
      } else {
        let err = new Error(`Wrong credentials!`);
        next(err);
      };
    })
    .catch(err => next(err));
  });
