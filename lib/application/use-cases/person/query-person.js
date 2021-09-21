import Person from '../../domain/person';
import { InvalidPropertyError } from '../../../infrastructure/helpers/errors';


class GetPersonUC {
  constructor({ personRepository }) {
    this.personRepository = personRepository;
  }

  async get(idPerson, idUser) {
    const person = await this.personRepository
      .findOne({
        fields: ['id_person', 'first_name', 'last_name'],
        where: { id_person: idPerson, user: idUser }
      });

    if (!person)
    {throw new InvalidPropertyError(`The person with id ${idPerson} does not exist.`,
      'get-person',
      'not-exist');}

    this.person = new Person({
      validators: {},
      ...person
    });

    return person;
  }

  async getPersonByUser(idUser) {

    const person = await this.personRepository
      .findOne({
        fields: ['id_person', 'first_name', 'last_name'],
        where: { user: idUser }
      });

    if (!person)
    {throw new InvalidPropertyError(`The person with id_user ${idUser} does not exist.`,
      'not-exist');}

    return person;
  }
}

export default GetPersonUC;
