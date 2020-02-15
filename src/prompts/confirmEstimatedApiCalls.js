import inquirer from 'inquirer';
import chalk from 'chalk';

const confirmEstimatedApiCalls = (estimatedApiCalls) => inquirer.prompt([
  {
    name: 'confirmEstimatedApiCalls',
    message: `This will make ~${chalk.yellowBright.bold.underline(estimatedApiCalls)} API calls to GitHub - is that ok?`,
    default: true,
    type: 'confirm',
  },
]);

export default confirmEstimatedApiCalls;
