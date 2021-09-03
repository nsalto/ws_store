export class RequiredParamError extends Error {
    constructor(param) {
      super(`${param} can not be null or undefined.`);
      this.status = 400;
      this.name = 'RequiredParameterError';
      this.path = param;
      this.type = 'required';
    }
  }
  
  export class InvalidPropertyError extends Error {
    constructor(msg, path, type = 'invalid') {
      super(msg);
      this.status = 400;
      this.name = 'InvalidPropertyError';
      this.path = path;
      this.type = type;
    }
  }
  
  export class InvalidNullError extends Error {
    constructor(msg, path, type = 'invalid') {
      super(msg);
      this.status = 400;
      this.name = 'InvalidNullError';
      this.path = path;
      this.type = type;
    }
  }
  
  export class ResourceNotAvailableError extends Error {
    constructor(msg, path, type = 'invalid') {
      super(msg);
      this.status = 400;
      this.name = 'resourceNotAvailableError';
      this.path = path;
      this.type = type;
    }
  }
  
  export class ExistingResource extends Error {
    constructor(msg, path, type = 'invalid') {
      super(msg);
      this.status = 400;
      this.name = 'existingResource';
      this.path = path;
      this.type = type;
    }
  }
  
  export class UnauthorizedError extends Error {
    constructor(msg = 'Unauthorized.', path, type) {
      super(msg);
      this.status = 401;
      this.name = 'UnauthorizedError';
      this.path = path;
      this.type = type;
    }
  }
  
  export class ForbiddenError extends Error {
    constructor(msg = 'Forbidden.', path, type) {
      super(msg);
      this.status = 403;
      this.name = 'ForbiddenError';
      this.path = path;
      this.type = type;
    }
  }
  
  export class FormatDocumentError extends Error {
    constructor(msg, path, type = 'invalid') {
      super(msg);
      this.status = 400;
      this.name = 'FormatDocumentError';
      this.path = path;
      this.type = type;
    }
  }
  