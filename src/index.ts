// setting up modules
import express from 'express';
import * as bodyParser from 'body-parser';
import { Client } from 'ts-postgres';
import session from 'express-session';

// importing routers
import { artistsRouter as artists } from './routes/artistsRouter';

// importing app's middleware
import { auth } from './middleware/auth';

// creating app
const app = express();

// setting up port (app.set(name, value) assigns any name to value)
app.set('port', process.env.PORT || 3000);

// connecting to bd and starting server
(async () => {
  await connectPostgres();
  app.listen(app.get('port'), () => console.log(`Running on http://localhost:${app.get('port')}`));
}) ();

// returning middleware that parses json and only looks at request where Content-Type header matches the type option
app.use(bodyParser.json());
// using the session middleware
// forcing the session to be saved back to the session store, even if the sission was never midified during the request
// fircing a session that id 'uninitialized' to be saved to the store. A session is uninitialized when it is new but not modified
app.use(session({
  secret: '12345-67890-09876-54321',
  resave: true,
  saveUninitialized: true
}));

// setting up routes
app.get('/', (req, res, next) => {res.send('hi')});

// using app's authorization middleware
app.use(auth);

app.use('/artists', artists);

// setting up Postgres Client
async function connectPostgres() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'artists_application',
    user: 'postgres',
    password: 'kiopnm'
  });

  try {
    await client.connect();
    console.log('Connected to artists_application BD on port 5432!');
  } catch (error) {
    console.log('Couldn\'t connect to artists_application database!');
  }
};