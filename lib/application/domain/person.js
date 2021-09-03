
import {
    requiredParam,
    validateParam,
    validateJustNumber
  } from '../../infrastructure/helpers/validations';
  import { capitalize } from '../../infrastructure/helpers/strings';
  
  class Person {
    constructor({
      id_person,
      first_name = requiredParam('nombre'),
      last_name = requiredParam('apellido'),
      company_name,
      created_at,
      deleted_at,
      update_at,
      user,
      personType
    }) {
      validateParam({ type: 'string', min: 2, max: 30, label: 'nombre', value: first_name });
      validateParam({ type: 'string', min: 2, max: 30, label: 'apellido', value: last_name });
  
      if (personType?.id_person_type === 2) {
        if (!company_name) { requiredParam('empresa'); }
        validateParam({ type: 'string', min: 3, max: 50, label: 'empresa', value: company_name });
      }
  
      this.id_person = id_person;
      this.first_name = capitalize(first_name);
      this.last_name = capitalize(last_name);
      this.company_name = company_name ? company_name : null;
      this.created_at = created_at;
      this.deleted_at = deleted_at;
      this.update_at = update_at;
      this.user = user;
      this.personType = personType;
    }
  
  }
  
  export default Person;
  