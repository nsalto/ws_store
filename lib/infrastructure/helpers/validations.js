import { InvalidPropertyError, InvalidNullError } from './errors';

export function requiredParam(param) {
  const requiredParamError = new Error(
    `Valor requerido, "${param}" faltante.`
  );
  // preserve original stack trace
  if (typeof Error.captureStackTrace === 'function') {
    Error.captureStackTrace(
      requiredParamError,
      requiredParam
    );
  }
  throw requiredParamError;
}

export function validateParam({
  type = null,
  min = null,
  max = null,
  label = requiredParam('label'),
  value = requiredParam('value')
}) {
  if (value) {
    if (type && type === 'number' && isNaN(parseInt(value))) { throw new InvalidPropertyError(`${label} debe ser de tipo ${type}.`); }

    if (min && value.toString().length < min) {
      throw new InvalidPropertyError(`${label} debe tener al menos ${min} caracteres de largo.`,
        label,
        'min');
    }
    else if (max && value.toString().length > max) {
      throw new InvalidPropertyError(`${label} debe tener como máximo ${max} caracteres de largo.`,
        label,
        'max');
    }
  }
  return value;
}

export function validateEmail(email) {
  if (email) {
    /* eslint-disable no-useless-escape */
    const valid = new RegExp(/^[\w\.]+@([\w-]+\.)+[\w]{2,4}$/);
    if (!valid.test(email)) {
      throw new InvalidPropertyError('Formato de email inválido.',
        'email');
    }
  }
}

export function validateJustNumber(value) {
  if (value) {
    const valid = new RegExp(/^[0-9]*$/);
    if (!valid.test(value)) {
      throw new InvalidPropertyError('Se aceptan solo números',
        'number');
    }
  }
}

export function validateJustFloatNumber(value, field) {
  if (value) {
    const valid = new RegExp(/^[0-9,.\s]+$/);
    if (!valid.test(value)) {
      throw new InvalidPropertyError('En el campo ' + field + ' se aceptan solo números',
        'number');
    }
  }
}

export function validatePasswordFormat(password) {
  if (password) {
    const valid = new RegExp(/^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)[A-ZñÑa-z\d!¡$%@#£€*?&^<>()+-_{}]{8,}$/);
    if (!valid.test(password)) {
      throw new InvalidPropertyError('Formato de password inválido.',
        'password');
    }
  }
}

export function validateNoSpecialCharacters(value, field) {
  if (value) {
    const valid = new RegExp(/^[A-ZñÑa-z0-9\s]+$/);
    if (!valid.test(value)) {
      throw new InvalidPropertyError('No se aceptan caracteres especiales en el campo' + field,
        'caracteres especiales');
    }
  }
}

export function validateIsNotNull(value, field) {
  if (!value) {
    throw new InvalidNullError('No se acepta valor Null en el campo ' + field);
  }
}

export function validateIsNotNegativeValue(value, field) {
  let result = Math.sign(value);
  if (result === -1) {
    throw new InvalidPropertyError('No se acepta valor negativo en el campo ' + field);
  }
}


export function validateOneValueBeTrue(values, fields) {
  let result = values.find(value => value === true);
  if (!result) {
    throw new InvalidPropertyError('En al menos un campo debe contener el valor True ' + fields);
  }
}
