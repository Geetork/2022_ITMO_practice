// setting up modules
import { pool } from '../db_config'

export class ClientInstance {
  async getData(query: string) {
    try {
      const client = await pool.acquire();
      const data = await client.query(query);
      pool.release(client);
      return data;
    } catch (error) {
      return new Error('Error occured!');
    }
  };
};
