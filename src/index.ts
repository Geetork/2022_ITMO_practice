// setting up modules
import 'reflect-metadata';
import express from 'express';
import * as bodyParser from 'body-parser';
import session from 'express-session';
import { createConnection } from 'typeorm';
import config from './config';

declare module 'express-session' {
  interface Session {
    user: string;
  }
};

// importing routers
import { artistsRouter as artists } from './routes/artistsRouter';
import { usersRouter as users} from './routes/usersRouter';

// importing app's middleware
import { auth } from './middleware/auth';

// creating app
const app = express();

// setting up port (app.set(name, value) assigns any name to value)
app.set('port', parseInt(config.PORT) || 3000);

// starting bd connection and server
const start = async () => {
  await createConnection({
    type: 'postgres',
    host: config.DB_HOST,
    port: parseInt(config.DB_PORT),
    database: config.DATABASE,
    username: config.DB_USER,
    password: config.DB_PASSWORD,
    entities: ['./src/models/*.ts']
  });
  app.listen(app.get('port'), () => console.log(`Running on http://localhost:${app.get('port')}`));
};

start().catch(console.error);

// returning middleware that parses json and only looks at request where Content-Type header matches the type option
app.use(bodyParser.json());
// using the session middleware
// forcing the session to be saved back to the session store, even if the sission was never midified during the request
// forcing a session that id 'uninitialized' to be saved to the store. A session is uninitialized when it is new but not modified
app.use(session({
  secret: config.SECRET,
  resave: true,
  saveUninitialized: true
}));

// setting up routes
app.get('/', (req, res, next) => {res.send('hi')});
app.use(users);

// using app's authorization middleware
app.use(auth);

app.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {next(err)});
    res.clearCookie('connect.sid');
    res.redirect('/');
});

app.use('/artists', artists);

module.exports = app;
