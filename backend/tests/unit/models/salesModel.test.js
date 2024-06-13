const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/database/connection');
const { salesModel } = require('../../../src/models');
const { salesALL, saleID, salesProducts } = require('../../mocks/salesMock');

describe('Testa Model de sales', function () {
  it('retorna a lista de sales', async function () {
    sinon.stub(connection, 'execute').resolves([salesALL]);
    const sales = await salesModel.getAll();
    expect(sales).to.be.an('array');
    expect(sales).to.have.lengthOf(3);
    expect(sales).to.be.deep.equal(salesALL);
  });

  it('retorna um sale específico', async function () {
    sinon.stub(connection, 'execute').resolves([saleID]);
    const sale = await salesModel.getById(2);
    expect(sale).to.be.an('object');
    expect(sale).to.be.deep.equal(saleID);
  });

  it('não é possível listar uma venda que não existe', async function () {
    sinon.stub(connection, 'execute').resolves([]);
    const sale = await salesModel.getById(4);
    expect(sale).to.be.equal(null);
  });

  it('cria o sale product id', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 3 }]);
    const sale = await salesModel.insert(salesProducts);
    expect(sale).to.be.an('number');
    expect(sale).to.be.deep.equal(3);
  });

  it('remove um sale', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const sale = await salesModel.deleteId(2);
    expect(sale).to.be.an('object');
    expect(sale).to.be.deep.equal({ affectedRows: 1 });
  });

  afterEach(function () {
    sinon.restore();
  });
});