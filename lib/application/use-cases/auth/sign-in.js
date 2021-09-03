import User from '../../domain/user';
import config from '../../../infrastructure/config/env';
import { ForbiddenError, UnauthorizedError } from '../../../infrastructure/helpers/errors';
import bcrypt from 'bcryptjs';

class SignInUC {
  constructor({ usersRepository, personRepository, jwt, userAuthorityRepository }) {
    this.usersRepository = usersRepository;
    this.personRepository = personRepository;
    this.jwt = jwt;
    this.userAuthorityRepository = userAuthorityRepository;
  }

  async signIn(userInfo, adminLogin) {

    this.userInfo = new User({
      validators: {},
      ...userInfo
    });

    const user = await this.usersRepository
      .findOneWithRelations({
        fields: ['id_user', 'email', 'password', 'verified', 'deleted_at'],
        where: { email: this.userInfo.email }
      });

    const unauthorizedError = 'Email y/o contraseña inválidos.';
    if (!user) {
      throw new UnauthorizedError(unauthorizedError,
        'credentials',
        'incorrect');
    }
    if (!bcrypt.compareSync(this.userInfo.password,
      user.password)) {
      throw new UnauthorizedError(unauthorizedError,
        'credentials',
        'incorrect');
    }
    if (user.deleted_at) {
      throw new ForbiddenError('El usuario no está activado',
        'user',
        'activation');
    }
    if (!user.verified) {
      throw new ForbiddenError('Usuario no verificado, revise su cuenta de correo por el link de activación',
        'user',
        'activation');
    }

    const authorities = await this.userAuthorityRepository.findAllWithRelations({
      relations: ['authority'],
      where: { user: user.id_user }
    });

    let userAuthorities = [];
    authorities[0].forEach(x => userAuthorities.push(x.authority.description));
    user.authorities = userAuthorities;

    if (adminLogin) {
      if (!user.authorities.some(authority => authority === 'ROLE_ADMIN' || authority === 'ROLE_AGENT')) {
        throw new ForbiddenError('Usuario con roles insuficientes',
          'user',
          'unauthorized');
      }
    }

    delete user.password;

    const person = await this.personRepository
      .findOneWithRelations({
        where: { user: user.id_user }
      });

    const token = this.jwt
      .sign({
        id_user: user.id_user,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + (60 * 60), //one hour expiration
      },
      config.JWT.KEY);

    return {
      token,
      user,
      person
    };
  }
}

export default SignInUC;
