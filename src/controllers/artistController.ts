// setting up modules
import { getConnection } from 'typeorm';
import { Artist } from '../models/artist';

export class ArtistController {
  async getAll() {
    return getConnection().manager.find(Artist);
  };

  async getById(id: number) {
    return getConnection().manager.findOne(Artist, {id: id});
  };
};
