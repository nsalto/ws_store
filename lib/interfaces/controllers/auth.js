import UsersRepository from '../../infrastructure/orm/typeorm/repositories/users';
import PersonRepository from '../../infrastructure/orm/typeorm/repositories/person';
import UserAuthorityRepository from '../../infrastructure/orm/typeorm/repositories/user-authority';
import JwtManager from '../../infrastructure/security/jwt-manager';
import SignInUC from '../../application/use-cases/auth/sign-in';
import SignInAndina from '../../application/use-cases/auth/sign-in-Andina';

async function signIn(httpRequest) {

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

async function signInAndina(httpRequest) {
  const  { email, employee_file } = httpRequest.body;
  console.log(email, employee_file);

  const adminLogin = false;
  const usersRepository = new UsersRepository();
  const personRepository = new PersonRepository();
  const jwt = new JwtManager();
  const userAuthorityRepository = new UserAuthorityRepository();
  const useCase = new SignInAndina({
    usersRepository,
    personRepository,
    jwt,
    userAuthorityRepository
  });

  //Tratment
  const user = await useCase.signIn({ email, employee_file }, adminLogin);

  return {
    //headers,
    statusCode: 200,
    body: user
  };
};

module.exports = {
  signIn,
  signInAndina
};
