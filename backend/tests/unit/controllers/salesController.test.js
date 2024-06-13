const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { salesStatus, salesALL, saleSuccessful, saleNotFound, saleID, salesProductsCreated } = require('../../mocks/salesMock');
const { productsSuccessfulDelete } = require('../../mocks/productsMock');

describe('Testa Controller de sales', function () {
  it('retorna sales com sucesso - status 200', async function () {
    sinon.stub(salesService, 'getAll').resolves(salesStatus);
    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(salesALL);
  });

  it('retorna um sale específico com sucesso - status 200', async function () {
    sinon.stub(salesService, 'getById').resolves(saleSuccessful);
    const req = { params: { id: 2 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(saleID);
  });

  it('Não encontra um sale com id inexistente - status 404', async function () {
    sinon.stub(salesService, 'getById').resolves(saleNotFound);
    const req = { params: { id: 123456789 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', 'Sale not found'));
  });

  it('cria uma sale com vários produtos - status 201', async function () {
    sinon.stub(salesService, 'insert').resolves(salesProductsCreated);
    const req = { params: { }, body: { itemsSold: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 5 }] } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(salesProductsCreated.data);
  });

  it('remove uma sale com sucesso - status 204', async function () {
    sinon.stub(salesService, 'deleteId').resolves(productsSuccessfulDelete);
    const req = { params: { id: 2 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.deleteId(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });

  afterEach(function () {
    sinon.restore();
  });
});