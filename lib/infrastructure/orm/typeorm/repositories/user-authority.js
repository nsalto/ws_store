import CommonRepository from './common';
import UserAuthoritySchema from '../schemas/user-authority';

class UserAuthorityRepository extends CommonRepository {
  constructor() {
    super(UserAuthoritySchema);
  }
}

export default UserAuthorityRepository;
