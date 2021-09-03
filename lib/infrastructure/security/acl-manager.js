import { UnauthorizedError, ForbiddenError } from '../helpers/errors';
import JwtManager from './jwt-manager';
import config from '../config/env';
import { getNamespace } from 'cls-hooked';
import nouser from './routes/no-user';
import loggeduser from './routes/logged-user';

class AclManager {
  constructor() {
    this.jwt = new JwtManager();
  }

  async authenticate(httpRequest) {
    const validatePath = (routes, httpReq) => {
      httpReq.route = httpReq.route.replace(/^\/(tst|stg|dev-cloud|prod)\//,
        '/api/');
      return routes
        .some((url) =>
          url.resource.test(httpReq.route)
          && url.methods.some((method) => method === httpReq.method));
    };

    if (validatePath(nouser,
      httpRequest)) { return null; }

    let user = {};

    //Validate
    const authorization = httpRequest.headers.Authorization;
    if (!authorization) {
      throw new UnauthorizedError(
        'The Authorization token does not exist.',
        'authorization',
        'security');
    }
    const token = authorization.split(' ')[1];

    try {
      const hasPermission = validatePath(loggeduser,
        httpRequest);
      if (!hasPermission) { return null; }
      user = this.jwt.verify(token,
        config.JWT.KEY);
      let namespace = getNamespace('session');
      namespace.set('user',
        user);
    } catch (error) {
      throw new ForbiddenError(
        'The Authorization token has no permission to access resource.',
        'authorization',
        'security');
    }
    return user;
  }
}

export default AclManager;
