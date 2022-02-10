// setting up modules
import { getConnection } from 'typeorm';
import { User } from '../models/user';

export class UserController {
  async findUser(username: string, password: string) {
    return getConnection().manager.findOne(User, {
      username: username,
      password: password
    });
  };

  async createUser(username: string, password: string) {
    let user = new User();
    user.username = username;
    user.password = password;
    return user;
  };

  async addUser(user: User) {
    await getConnection().manager.save(User, user);
  };
};
