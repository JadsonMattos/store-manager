const Joi = require('joi');

const saleSchema = Joi.object({
  productId: Joi.number().integer().required().messages({
    'any.required': '"productId" is required',
  }),
  quantity: Joi.number().integer().min(1).required()
    .messages({
      'any.required': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
    }),
});

const array = Joi.array().items(saleSchema);

module.exports = {
  saleSchema,
  array,
};