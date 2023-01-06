const path = require('path');
// const { componentExists } = require('../utils');

const pugPath = path.resolve('src/html');
const cssPath = path.resolve('src/css');
const jsPath = path.resolve('src');

module.exports = {
  description: 'add Component',
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What should it be called (kebab case):',
      default: 'my-new-page',
      validate(value) {
        if (!/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(value)) return 'Invalidte component name!';
        // return componentExists(value) ? 'Component name already exists!' : true;
        return true;
      },
    },
  ],
  actions: () => [
    {
      type: 'add',
      path: `${pugPath}/{{kebabCase name}}.pug`,
      templateFile: 'page/pug.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: `${cssPath}/{{kebabCase name}}.styl`,
      templateFile: 'page/css.hbs',
      abortOnFail: true,
    },
    {
      type: 'add',
      path: `${jsPath}/{{kebabCase name}}.js`,
      templateFile: 'page/js.hbs',
      abortOnFail: true,
    },
  ],
};
