const sinon = require('sinon');
const { expect } = require('chai');
const { salesModel, productsModel } = require('../../../src/models');
const { salesALL /* , salesProducts */ } = require('../../mocks/salesMock');
const { salesService } = require('../../../src/services');
const { validation } = require('../../../src/services/validations/validations');
const { array } = require('../../../src/services/validations/saleSchema');

describe('Testa Service de sales', function () {
  it('retorna sales com sucesso', async function () {
    sinon.stub(salesModel, 'getAll').resolves(salesALL);
    const response = [
      { saleId: 1, date: '2023-11-23T03:32:09.000Z', productId: 1, quantity: 5 },
      { saleId: 1, date: '2023-11-23T03:32:09.000Z', productId: 2, quantity: 10 },
      { saleId: 2, date: '2023-11-23T03:32:09.000Z', productId: 3, quantity: 15 },
    ];
    const service = await salesService.getAll();
    expect(service.status).to.be.equal('SUCCESSFUL');
    expect(service.data).to.be.an('array');
    expect(service.data).to.have.lengthOf(3);
    expect(service.data).to.be.deep.equal(response);
  });

  // it('cria uma sale com vários produtos com sucesso', async function () {
  //   sinon.stub(salesModel, 'insertProducts').resolves(3);
  //   const service = await salesService.insert(salesProducts);
  //   expect(service.status).to.be.equal('CREATED');
  //   expect(service.data.id).to.be.equal(3);
  //   expect(service.data.itemsSold).to.be.deep.equal(salesProducts);
  // });

  it('testa a validação do schema', async function () {
    sinon.stub(array, 'validate').resolves({ error: { message: 'Invalid data' } });
    const result = await validation([{ productId: 1, quantity: 2 }]);
    expect(result.type).to.equal('INVALID_DATA');
    expect(result.message).to.equal('Invalid data');
  });

  it('retorna Product not found se não existir campo productId para cadastrar', async function () {
    sinon.stub(array, 'validate').resolves({ error: null });
    sinon.stub(productsModel, 'getById').resolves(undefined);
    const result = await validation([{ productId: 1, quantity: 2 }]);
    expect(result.type).to.equal('NOT_FOUND');
    expect(result.message).to.equal('Product not found');
  });

  it('remove uma sale com sucesso', async function () {
    sinon.stub(salesModel, 'getById').resolves(salesALL);
    sinon.stub(salesModel, 'deleteId').resolves({ affectedRows: 1 });
    const service = await salesService.deleteId(1);
    expect(service.status).to.be.equal('NO_CONTENT');
    expect(service.data).to.be.deep.equal({});
  });

  it('deve retornar sucesso ao atualizar a quantidade', async function () {
    const saleId = 1;
    const productId = 1;
    const quantity = 10;
    sinon.stub(salesModel, 'getById').resolves([{ date: '2023-12-07T21:17:28.000Z' }]);
    sinon.stub(salesModel, 'updateQuantity').resolves({ quantity: 10 });
    const result = await salesService.updateQuantity(saleId, productId, quantity);
    expect(result).to.deep.equal({
      status: 'SUCCESSFUL',
      data: {
        date: '2023-12-07T21:17:28.000Z',
        productId: 1,
        quantity: 10,
        saleId: 1,
      },
    });
  });

  it('deve retornar not found ao atualizar a quantidade com sale não encontrada', async function () {
    const saleId = 1;
    const productId = 1;
    const quantity = 10;
    sinon.stub(salesModel, 'getById').returns([]);
    const result = await salesService.updateQuantity(saleId, productId, quantity);
    expect(result).to.deep.equal({
      status: 'NOT_FOUND',
      data: { message: 'Sale not found' },
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});