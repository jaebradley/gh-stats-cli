import chalk from 'chalk';

const formatPullRequestIdentifier = ({ owner, repository, number }) => `${chalk.underline.bold(`${chalk.blueBright(owner)}/${chalk.yellowBright(repository)}#${chalk.magentaBright(number)}`)}`;
const formatPullRequestStatus = ({
  isMerged,
  owner,
  repository,
  number,
}) => `${(isMerged && '🚀') || '🚧'} ${formatPullRequestIdentifier({ owner, repository, number })}`;
const formatPullRequestTitle = title => chalk.bold.cyan(title);
const formatPullRequestChanges = ({ additions, deletions, changedFiles }) => `${chalk.bold(
  `${chalk.greenBright(`+${additions}`)}, ${chalk.redBright(`-${deletions}`)}, ${chalk.magentaBright(`${changedFiles} 📁`)}`,
)}`;
const formatPullRequestCreationTime = createdAt => chalk.bold.greenBright(createdAt);
const formatPullRequestMergeTime = mergedAt => chalk.bold.yellowBright(mergedAt || '🙏');

export {
  formatPullRequestStatus,
  formatPullRequestTitle,
  formatPullRequestChanges,
  formatPullRequestCreationTime,
  formatPullRequestMergeTime,
};
