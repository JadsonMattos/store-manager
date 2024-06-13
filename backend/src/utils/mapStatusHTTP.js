const httpError = {
  SUCCESSFUL: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  INVALID_DATA: 422,
  BAD_REQUEST: 400,
  INTERNAL_ERROR: 500,
  NO_CONTENT: 204,
};

const mapStatusHTTP = (status) => httpError[status] || httpError.INTERNAL_ERROR;

module.exports = mapStatusHTTP;