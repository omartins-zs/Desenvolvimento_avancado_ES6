const assert = require('assert');
const Math = require('../src/math.js');
const { expect } = require('chai');
const sinon = require('sinon');

let value = 0;

describe('Math class & ES6+ Advanced Features', function () {
  beforeEach(function () {
    value = 0;
  });

  it('Sum two numbers asynchronously using callback', function (done) {
    const math = new Math();
    this.timeout(3000);

    value = 5;

    math.sum(value, 5, (result) => {
      assert.strictEqual(result, 10);
      expect(result).to.equal(10);
      done();
    });
  });

  it('Multiply two numbers with default arguments', function () {
    const math = new Math();
    this.timeout(5000);

    expect(math.multiply(value, 5)).to.equal(0);
    expect(math.multiply(7)).to.equal(7);
    expect(math.multiply(6, 4)).to.equal(24);
  });

  it('Compare property name of objects with Chai', function () {
    const obj = {
      name: 'Daniel',
    };

    expect(obj).to.have.property('name').equal('Daniel');
  });

  it('Compare objects deeply with Chai', function () {
    const obj = {
      name: 'Daniel',
    };

    const obj2 = {
      name: 'Daniel',
    };

    expect(obj).to.deep.equal(obj2);
  });

  it('Calls res.load with sum and index values using Sinon spy', function () {
    const req = {};
    const res = {
      load: sinon.spy(),
    };
    const math = new Math();

    math.printSum(req, res, 5, 5);

    expect(res.load.calledOnce).to.be.true;
    expect(res.load.args[0][0]).to.equal('index');
    expect(res.load.args[0][1]).to.equal(10);
  });

  it('Sum unlimited numbers using Rest Operator (...args)', function () {
    const math = new Math();
    const total = math.sumRest(5, 5, 10, 20, 15);

    expect(total).to.equal(55);
  });

  it('Merge objects using Spread Operator and Destructuring', function () {
    const math = new Math();
    const merged = math.mergeObjects({ course: 'ES6' }, { level: 'Avançado' });

    expect(merged).to.include({
      course: 'ES6',
      level: 'Avançado',
      mergedAt: 'ES6-Spread',
    });
    expect(math.sumDestructured({ a: 12, b: 8 })).to.equal(20);
  });

  it('Generate sequence of numbers using ES6 Generators (yield)', function () {
    const math = new Math();
    const gen = math.numberGenerator(10, 4, 5);
    const values = [...gen];

    expect(values).to.deep.equal([10, 15, 20, 25]);
  });

  it('Resolve async calculation using Promises and Async/Await', async function () {
    const math = new Math();
    const response = await math.calculateAsync(8, 7, 'multiply');

    expect(response).to.deep.equal({
      operation: 'multiply',
      a: 8,
      b: 7,
      result: 56,
      status: 'fulfilled',
    });
  });

  it('Emit events with EventEmitter (Users class) and handle CustomError', function (done) {
    const users = new Math.Users();
    users.once('User logged', (payload) => {
      expect(payload).to.have.property('user', 'Gabriel Martins');
      done();
    });

    users.userLogged({ user: 'Gabriel Martins' });
  });
});
