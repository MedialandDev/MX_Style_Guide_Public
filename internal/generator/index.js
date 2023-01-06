const pageGenerator = require('./page');

module.exports = (plop) => {
  plop.setGenerator('page', pageGenerator);
};
