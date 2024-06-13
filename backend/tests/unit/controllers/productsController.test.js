const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { productsStatus, productsALL, productSuccessful, productNotFound, productID, productCreated, productPostId, productSuccessfulUpdate } = require('../../mocks/productsMock');

describe('Testa Controller de produtos', function () {
  it('retorna produtos com sucesso - status 200', async function () {
    sinon.stub(productsService, 'getAll').resolves(productsStatus);
    const req = { params: { }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productsALL);
  });

  it('retorna um produto específico com sucesso - status 200', async function () {
    sinon.stub(productsService, 'getById').resolves(productSuccessful);
    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productID);
  });

  it('Não encontra um produto com id inexistente - status 404', async function () {
    sinon.stub(productsService, 'getById').resolves(productNotFound);
    const req = { params: { id: 123456789 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.getById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', 'Product not found'));
  });

  it('Inserindo um produto com id com sucesso - status 201', async function () {
    sinon.stub(productsService, 'insert').resolves(productCreated);
    const req = { params: { }, body: { name: 'ProductX' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.insert(req, res);
    const product = productPostId;
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(product);
  });

  it('atualizando um produto com sucesso - status 200', async function () {
    sinon.stub(productsService, 'put').resolves(productSuccessfulUpdate);
    const req = { params: { id: 1 }, body: { name: 'Martelo do Batman' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.put(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ id: 1, name: 'Martelo do Batman' });
  });

  it('deletando um produto com sucesso - status 200', async function () {
    sinon.stub(productsService, 'deleteId').resolves(productSuccessful);
    const req = { params: { id: 1 }, body: { } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.deleteId(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productID);
  });

  afterEach(function () {
    sinon.restore();
  });
});