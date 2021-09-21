import User from '../../domain/user';

class SignInAndina {
  constructor({ usersRepository, personRepository, userAuthorityRepository }) {
    this.usersRepository = usersRepository;
    this.personRepository = personRepository;
    this.userAuthorityRepository = userAuthorityRepository;
  }

  async signIn(userInfo, adminLogin) {

    this.userInfo = new User({
      ...userInfo
    });

    const user = await this.usersRepository
      .findOneWithRelations({
        fields: ['id_user', 'email', 'employee_file'],
        where: { email: this.userInfo.email }
      });

    const unauthorizedError = 'Email y/o contraseña inválidos.';
    if (!user) {
      throw new UnauthorizedError(unauthorizedError,
        'credentials',
        'incorrect');
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

    const person = await this.personRepository
      .findOneWithRelations({
        where: { user: user.id_user }
      });

    return {
      user,
      person
    };
  }
}

export default SignInAndina;
