import inquirer from 'inquirer';

import {
  validateExistence,
} from './validators';

const setup = () => inquirer.prompt([
  {
    name: 'personalAccessToken',
    message: 'Input your GitHub Personal Access Token',
    validate: (token) => validateExistence({ value: token, type: 'personal access token' }),
    type: 'password',
  },
]);

export default setup;
