const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateProduct = require('../../../src/middlewares/validateProduct');

const { expect } = chai;

chai.use(sinonChai);

describe('testa middlewares', function () {
  it('verifica se o middleware está sendo chamado', async function () {
    const req = { body: { name: 'ProdutoX' } };
    const res = {};
    const next = sinon.stub();
    await validateProduct(req, res, next);
    expect(next).to.have.been.calledWith();
  });
  
  it('testa o validateProduct caso o nome seja null', async function () {
    const req = { body: { name: null } };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();
    res.status.returns(res);
    await validateProduct(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"name" is required' });
  });

  it('testa o validateProduct caso o nome vazio', async function () {
    const req = { body: { name: '' } };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();
    res.status.returns(res);
    await validateProduct(req, res, next);
    expect(res.status).to.be.calledWith(400);
    expect(res.json).to.be.calledWith({ message: '"name" is required' });
  });
  
  it('testa o validateProduct caso o nome tenha menos de 5 caracteres', async function () {
    const req = { body: { name: 'a' } };
    const res = { status: sinon.stub(), json: sinon.stub() };
    const next = sinon.stub();
    res.status.returns(res);
    await validateProduct(req, res, next);
    expect(res.status).to.be.calledWith(422);
    expect(res.json).to.be.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
