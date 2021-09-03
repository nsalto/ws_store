import CommonRepository from './common';
import PersonSchema from '../schemas/person';

class PersonRepository extends CommonRepository {
  constructor() {
    super(PersonSchema);
  }
}

export default PersonRepository;
