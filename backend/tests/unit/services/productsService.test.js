const sinon = require('sinon');
const { expect } = require('chai');
const { productsModel } = require('../../../src/models');
const { productsALL, productPostId, productPostName, productID, productUpdateId, productUpdate, productDeleted } = require('../../mocks/productsMock');
const { productsService } = require('../../../src/services');

describe('Testa Service de produtos', function () {
  it('retorna produtos com sucesso', async function () {
    sinon.stub(productsModel, 'getAll').resolves(productsALL);
    const response = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];
    const service = await productsService.getAll();
    expect(service.status).to.be.equal('SUCCESSFUL');
    expect(service.data).to.be.an('array');
    expect(service.data).to.have.lengthOf(3);
    expect(service.data).to.be.deep.equal(response);
  });

  it('insere um produto específico com sucesso', async function () {
    sinon.stub(productsModel, 'insert').resolves(4);
    sinon.stub(productsModel, 'getById').resolves(productPostId);
    const service = await productsService.insert(productPostName);
    expect(service.status).to.be.equal('CREATED');
    expect(service.data).to.be.an('object');
    expect(service.data).to.be.deep.equal(productPostId);
  });

  it('testa se ocorre um erro ao inserir um produto', async function () {
    sinon.stub(productsModel, 'insert').resolves(null);
    sinon.stub(productsModel, 'getById').resolves(productPostId);
    const service = await productsService.insert(productPostName);
    expect(service.status).to.be.equal('NOT_FOUND');
  });

  it('atualiza um produto com sucesso', async function () {
    sinon.stub(productsModel, 'getById').onFirstCall().resolves(productID)
      .onSecondCall()
      .resolves(productUpdateId);
    sinon.stub(productsModel, 'put').resolves(true);
    const service = await productsService.put(1, productUpdate);
    expect(service.status).to.be.equal('SUCCESSFUL');
    expect(service.data).to.be.an('object');
    expect(service.data).to.be.deep.equal(productUpdateId);
  });

  it('testa se ocorre um erro ao deletar um produto', async function () {
    sinon.stub(productsModel, 'deleteId').resolves({ affectedRows: 1 });
    sinon.stub(productsModel, 'getById').resolves(productDeleted);
    const product = await productsService.deleteId(10);
    expect(product.status).to.be.equal('NO_CONTENT');
  });

  afterEach(function () {
    sinon.restore();
  });
});