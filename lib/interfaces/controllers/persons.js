
import SignUpUC from '../../application/use-cases/person/sign-up';
import GetPersonUC from '../../application/use-cases/person/query-person';
import PersonRepository from '../../infrastructure/orm/typeorm/repositories/person';
import UserRepository from '../../infrastructure/orm/typeorm/repositories/users';
import UserAuthorityRepository from '../../infrastructure/orm/typeorm/repositories/user-authority';
import peopleSerializer from '../serializers/people';
import { getNamespace } from 'cls-hooked';

async function signUp(httpRequest) {
  // Arrange
  const newPerson = httpRequest.body;
  const personRepository = new PersonRepository();
  const userRepository = new UserRepository();
  const userAuthorityRepository = new UserAuthorityRepository();
  const useCase = new SignUpUC({
    personRepository,
    userRepository,
    userAuthorityRepository
  });

  // Treatment
  const user = await useCase.singUp(newPerson);

  // Output
  return {
    //headers,
    statusCode: 200,
    body: peopleSerializer(user)
  };
}

async function getPerson(httpRequest) {
  // Arrange
  const personId = httpRequest.params.id;
  const personRepository = new PersonRepository();
  const useCase = new GetPersonUC({
    personRepository
  });

  const namespace = getNamespace('session');
  const user = namespace.get('user');

  const person = await useCase.get(personId,
    user.id_user);

  return {
    //headers,
    statusCode: 200,
    body: person
  };
}

module.exports = {
  signUp,
  getPerson
};
