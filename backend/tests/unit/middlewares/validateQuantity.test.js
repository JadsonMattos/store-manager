const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateQuantity = require('../../../src/middlewares/validateQuantity');

const { expect } = chai;

chai.use(sinonChai);

describe('testa middlewares', function () {
  it('testa erro quando campo quantity não é fornecido', async function () {
    const req = { body: {} };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();
    res.status.returns(res);
    await validateQuantity(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"quantity" is required' });
  });

  it('testa erro quando quantity for menor ou igual 0', async function () {
    const req = { body: { quantity: 0 } };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();
    res.status.returns(res);
    await validateQuantity(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"quantity" must be greater than or equal to 1' });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
