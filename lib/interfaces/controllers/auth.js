import UsersRepository from '../../infrastructure/orm/typeorm/repositories/users';
import PersonRepository from '../../infrastructure/orm/typeorm/repositories/person';
import UserAuthorityRepository from '../../infrastructure/orm/typeorm/repositories/user-authority';
import JwtManager from '../../infrastructure/security/jwt-manager';
import SignInUC from '../../application/use-cases/auth/sign-in';

async function signIn(httpRequest) {
  console.log(httpRequest.body)
  // Arrange
  const { email, password } = httpRequest.body;
  const adminLogin = false;
  const usersRepository = new UsersRepository();
  const personRepository = new PersonRepository();
  const jwt = new JwtManager();
  const userAuthorityRepository = new UserAuthorityRepository();
  const useCase = new SignInUC({
    usersRepository,
    personRepository,
    jwt,
    userAuthorityRepository
  });

  // Treatment
  const user = await useCase.signIn({ email, password },
    adminLogin);
  // Output
  return {
    //headers,
    statusCode: 200,
    body: user //TODO: userSerializer(user)
  };
}

module.exports = {
  signIn,
};
