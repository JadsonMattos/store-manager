// const snakeize = require('snakeize');

const columnName = (object) => Object.keys(object).join(', ');
const placeholder = (object) => Object.keys(object).map(() => '?').join(', ');

module.exports = {
  columnName,
  placeholder,
};
