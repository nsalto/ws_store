import CommonRepository from './common';
import UserSchema from '../schemas/user';

class UsersRepository extends CommonRepository {
  constructor() {
    super(UserSchema);
  }
}

export default UsersRepository;
