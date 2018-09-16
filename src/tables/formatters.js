import chalk from 'chalk';

const formatPullRequestIdentifier = ({ owner, repository, number }) => `${chalk.underline.bold(`${chalk.blueBright(owner)}/${chalk.yellowBright(repository)}${chalk.cyanBright('#')}${chalk.magentaBright(number)}`)}`;
const formatPullRequestTitle = title => chalk.bold.cyan(title);
const formatPullRequestChanges = ({ additions, deletions, changedFiles }) => `${chalk.bold(
  `${chalk.greenBright(`+${additions}`)}, ${chalk.redBright(`-${deletions}`)} over ${chalk.magentaBright(`${changedFiles} files`)}`,
)}`;
const formatPullRequestCreationTime = createdAt => chalk.bold.greenBright(createdAt);
const formatPullRequestMergeTime = mergedAt => chalk.bold.yellowBright(mergedAt || 'N/A');
const formatHeader = header => chalk.bold.magentaBright.underline(header);

export {
  formatPullRequestIdentifier,
  formatPullRequestTitle,
  formatPullRequestChanges,
  formatPullRequestCreationTime,
  formatPullRequestMergeTime,
  formatHeader,
};
