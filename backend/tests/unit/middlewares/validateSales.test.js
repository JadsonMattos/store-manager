const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateSale = require('../../../src/middlewares/validateSale');

const { expect } = chai;

chai.use(sinonChai);

describe('testa middlewares', function () {
  it('testa impossibilidade de cadastrar venda caso não tenha campo productId', async function () {
    const req = { body: [{ quantity: 1 }] };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();
    res.status.returns(res);
    await validateSale(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"productId" is required' });
  });

  it('testa impossibilidade de cadastrar venda caso não tenha campo quantity', async function () {
    const req = { body: [{ productId: 1 }] };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();
    res.status.returns(res);
    await validateSale(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"quantity" is required' });
  });
  
  afterEach(function () {
    sinon.restore();
  });
});
