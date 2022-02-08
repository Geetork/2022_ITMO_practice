// setting up modules
import express from 'express';
import { artistsRouter as artists } from './routes/artistsRouter';
import * as bodyParser from 'body-parser';
import { Client } from 'ts-postgres';
import { auth } from './middleware/auth';

// creating app
const app = express();

// setting up port (app.set(name, value) assigns any name to value)
app.set('port', process.env.PORT || 3000);

// returning middleware that parses json and only looks at request where Content-Type header matches the type option
app.use(bodyParser.json());

app.use(auth);

// setting up routes
app.get('/', (req, res, next) => {res.send('hi')});
app.use('/artists', artists);

// connecting to bd and starting server
(async () => {
  await connectPostgres();
  app.listen(app.get('port'), () => console.log(`Running on http://localhost:${app.get('port')}`));
}) ();

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
  } catch (error) {
    console.log('Couldn\'t connect to artists_application database!');
  }
};
