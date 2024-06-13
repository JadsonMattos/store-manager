const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../src/database/connection');
const { productsModel } = require('../../../src/models');
const { productsALL, productID, productPostName, productUpdate } = require('../../mocks/productsMock');

describe('Testa Model de produtos', function () {
  it('retorna a lista de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([productsALL]);
    const products = await productsModel.getAll();
    expect(products).to.be.an('array');
    expect(products).to.have.lengthOf(3);
    expect(products).to.be.deep.equal(productsALL);
  });

  it('retorna um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([[productID]]);
    const product = await productsModel.getById(1);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(productID);
  });

  it('insere um produto específico', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 4 }]);
    const product = await productsModel.insert(productPostName);
    expect(product).to.be.equal(4);
  });

  it('atualiza um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const product = await productsModel.put(1, productUpdate);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({ affectedRows: 1 });
  });

  it('deleta um produto', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);
    const product = await productsModel.deleteId(1);
    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal({ affectedRows: 1 });
  });

  afterEach(function () {
    sinon.restore();
  });
});