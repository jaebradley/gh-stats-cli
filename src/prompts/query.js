import inquirer from 'inquirer';

const query = (defaultUsername) => inquirer.prompt([
  {
    name: 'username',
    message: 'Input a username to lookup statistics for',
    type: 'input',
    default: defaultUsername,
  },
  {
    name: 'organization',
    message: 'Input an organization',
    type: 'input',
  },
]);

export default query;
