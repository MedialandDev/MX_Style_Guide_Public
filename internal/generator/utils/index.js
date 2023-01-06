const fs = require('fs');
const path = require('path');


let containerNames = []; /* string[] */
let pageNames = []; /* string[] */

const componentNames = fs.readdirSync(path.resolve('src/components'));
try {
  containerNames = fs.readdirSync(path.resolve('src/containers'));
} catch (error) {
  //
}
try {
  pageNames = fs.readdirSync(path.resolve('src/pages'));
} catch (error) {
  //
}

const componentExists = (comp/* string */) => componentNames.indexOf(comp) > 0;
const containerExists = (comp/* string */) => containerNames.indexOf(comp) > 0;
const pageExists = (comp/* string */) => pageNames.indexOf(comp) > 0;

module.exports = {
  componentExists,
  containerExists,
  pageExists,
};
