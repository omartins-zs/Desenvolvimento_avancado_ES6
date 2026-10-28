const EventEmitter = require('events');

class CustomError extends Error {
  constructor({ message, data }) {
    super(message);
    this.name = 'CustomError';
    this.data = data;
  }
}

class Users extends EventEmitter {
  userLogged(data) {
    this.emit('User logged', data);
  }
}

class Math extends EventEmitter {
  /**
   * Soma dois números de forma síncrona ou assíncrona (via callback)
   */
  sum(a = 0, b = 0, callback) {
    const result = Number(a) + Number(b);
    if (typeof callback === 'function') {
      setTimeout(() => {
        callback(result);
      }, 50);
    }
    return result;
  }

  /**
   * Multiplica dois números com suporte a Default Arguments
   */
  multiply(a = 0, b = 1) {
    return Number(a) * Number(b);
  }

  /**
   * Soma múltiplos argumentos utilizando Rest Operator (...)
   */
  sumRest(...args) {
    return args.reduce((acc, val) => acc + Number(val || 0), 0);
  }

  /**
   * Clona e mescla objetos com Spread Operator de forma segura
   */
  mergeObjects(baseObj = {}, extraObj = {}) {
    return {
      ...baseObj,
      ...extraObj,
      mergedAt: 'ES6-Spread',
    };
  }

  /**
   * Soma utilizando Destructuring de objeto com Default Arguments
   */
  sumDestructured({ a = 0, b = 0 } = {}) {
    return Number(a) + Number(b);
  }

  /**
   * Generator para sequência numérica sob demanda (yield)
   */
  *numberGenerator(start = 1, count = 5, step = 1) {
    let current = Number(start);
    for (let i = 0; i < count; i++) {
      yield current;
      current += Number(step);
    }
  }

  /**
   * Executa cálculo assíncrono utilizando Promise / Async-Await
   */
  async calculateAsync(a = 0, b = 0, operation = 'sum') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (typeof a !== 'number' || typeof b !== 'number' || Number.isNaN(a) || Number.isNaN(b)) {
          return reject(
            new CustomError({
              message: 'Parâmetros numéricos inválidos para operação assíncrona.',
              data: { type: 'ValidationError', a, b },
            })
          );
        }
        const value = operation === 'multiply' ? a * b : a + b;
        resolve({
          operation,
          a,
          b,
          result: value,
          status: 'fulfilled',
        });
      }, 40);
    });
  }

  /**
   * Invoca res.load com o índice e o resultado da soma (para testes com Sinon Spy/Stub)
   */
  printSum(req, res, a, b) {
    const result = Number(a) + Number(b);
    res.load('index', result);
    return result;
  }
}

Math.CustomError = CustomError;
Math.Users = Users;

module.exports = Math;
