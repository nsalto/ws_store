import Person from '../../domain/person';
import User from '../../domain/user';
import { InvalidPropertyError, /* UnauthorizedError  */} from '../../../infrastructure/helpers/errors';
import { getConnection } from 'typeorm';
import bcrypt from 'bcryptjs';
import { sendValidateAccountEmail } from '../../../infrastructure/helpers/mailing/mailing-service';
import crypto from 'crypto';

class SignUpUC {
  constructor({ personRepository, userRepository, userAuthorityRepository }) {
    this.personRepository = personRepository;
    this.userRepository = userRepository;
    this.userAuthorityRepository = userAuthorityRepository;
  }

  async registerUser() {
    const exist = await this.userRepository
      .findOne({
        fields: ['email'],
        where: { email: this.person.user.email }
      });

    if (exist) {
      throw new InvalidPropertyError(`El email ${this.person.user.email} ya está en uso`,
        'email',
        'duplicate');
    } else {
      const connection = getConnection();
      const queryRunner = connection?.createQueryRunner();
      await queryRunner?.connect();
      await queryRunner?.startTransaction();

      this.userInfo = new User({
        validators: {},
        ...this.person.user
      });

      let insertedPerson;
      try {
        insertedPerson = await this.personRepository.save({
          first_name: this.person.first_name,
          last_name: this.person.last_name,
          company_name: this.person.personType.id_person_type === 1 ? null : this.person.company_name,
          personType: this.person.personType
        });
        // If there is no user, it's a social user
        if (this.person.user.password) {
          let hash;
          const salt = bcrypt.genSaltSync(10);
          hash = bcrypt.hashSync(this.person.user.password,
            salt);
          this.person.user.password = hash;
        }

        this.person.user.verified = false;
        this.person.user.validationHash = crypto.createHash('md5').update(this.person.user.email).digest('hex');
        this.person.user.id_person = insertedPerson.id_person;

        const insertedUser = await this.userRepository.save(
          this.person.user
        );

        await this.userAuthorityRepository.save({
          user: insertedUser.id_user,
          authority: 3
        });

        insertedPerson = await this.personRepository.save(
          {
            ...insertedPerson,
            user: insertedUser,
          }
        );
      } catch (err) {
        console.log('error',
          err);
        await queryRunner?.rollbackTransaction();
      } finally {
        await queryRunner?.release();
      }

      this.person = await new Person({
        validators: {},
        ...insertedPerson
      });

      return this.person;
    }

  }

  async singUp(personInfo) {
    this.person = new Person({
      validators: {},
      ...personInfo
    });
    const registered = await this.registerUser();
    return registered;
  }
}

export default SignUpUC;
