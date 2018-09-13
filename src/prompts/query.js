import inquirer from 'inquirer';

const query = () => inquirer.prompt([
  {
    name: 'organization',
    message: 'Input an organization',
    type: 'input',
  },
]);

export default query;
