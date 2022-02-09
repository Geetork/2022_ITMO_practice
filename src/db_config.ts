// setting up modules
import { Client } from 'ts-postgres';
// generic resource pool with Promise API
import { createPool } from 'generic-pool';

// creating pool of connections (using factory object)
export const pool = createPool({
  create: async () => {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'artists_application',
      user: 'postgres',
      password: 'kiopnm'
    });
    return client.connect().then(() => {
      console.log('Connected to PostgreSQL database artists_application!');
      client.on('error', console.log);
      return client;
    })
  },
  destroy: async (client: Client) => {
    return client.end().then(() => {console.log('Connection to PostgreSQL database artists_application is destroyed')})
  },
  validate: (client: Client) => {
    return Promise.resolve(!client.closed);
  }
}, {
  max: 10 // max number of resources to create at any given time
});
