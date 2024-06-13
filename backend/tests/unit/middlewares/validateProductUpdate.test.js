const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const validateProductUpdate = require('../../../src/middlewares/validateProductUpdate');
const { productsService } = require('../../../src/services');

const { expect } = chai;

chai.use(sinonChai);

describe('testa middlewares', function () {
  it('testa o validateProductUpdate na impossibilidade de atualizar um produto inexistente', async function () { 
    sinon.stub(productsService, 'put').resolves(null);
    const req = { params: { id: 1 }, body: { name: 'Updated Product' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();
    await validateProductUpdate(req, res, next);
    expect(res.status).to.be.calledWith(404);
    expect(res.json).to.be.calledWith({ message: 'Product not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});
