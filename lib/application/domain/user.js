
import {
    validateEmail,
    validatePasswordFormat
  } from '../../infrastructure/helpers/validations';
  
  class User {
    constructor({
      id_user,
      email,
      password,
      created_at,
      deleted_at,
      update_at,
      properties
    }) {
      // validateParam({ type: 'string', min: 5, max: 50, label: 'email', value: email });
      // validateParam({ type: 'string', min: 8, max: 20, label: 'password', value: password });
      validateEmail(email);
      validatePasswordFormat(password);
  
      this.id_user = id_user;
      this.email = email;
      this.password = password;
      this.created_at = created_at;
      this.deleted_at = deleted_at;
      this.update_at = update_at;
      this.properties = properties;
    }
  }
  
  export default User;
  