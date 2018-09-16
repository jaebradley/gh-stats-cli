import chalk from 'chalk';
import wrap from 'word-wrap';
import dateFormat from 'date-fns/format';

const formatDateTime = dateTime => `${dateFormat(dateTime, 'YYYY-MM-DD')}\n${dateFormat(dateTime, 'h:mm A Z')}`;
const formatPullRequestIdentifier = ({ owner, repository, number }) => `${chalk.underline.bold(`${chalk.blueBright(owner)}/${chalk.yellowBright(repository)}${chalk.cyanBright('#')}${chalk.magentaBright(number)}`)}`;
const formatPullRequestTitle = title => chalk.bold.cyan(wrap(title));
const formatPullRequestChanges = ({ additions, deletions, changedFiles }) => `${chalk.bold(
  `${chalk.greenBright(`+${additions.toLocaleString()}`)}, ${chalk.redBright(`-${deletions.toLocaleString()}`)} (${chalk.cyanBright((additions - deletions).toLocaleString())})\n${chalk.magentaBright(`${changedFiles.toLocaleString()} files`)}`,
)}`;
const formatPullRequestCreationTime = createdAt => chalk
  .bold
  .greenBright(formatDateTime(createdAt));
const formatPullRequestMergeTime = mergedAt => chalk.bold.yellowBright((mergedAt && formatDateTime(mergedAt)) || 'N/A');
const formatHeader = header => chalk.bold.magentaBright.underline(header);
const formatCommentCount = count => chalk.bold.greenBright(count.toLocaleString());
const formatAuthorUsername = authorUsername => `${chalk.bold.yellowBright.underline(`@${authorUsername}`)}`;

export {
  formatPullRequestIdentifier,
  formatPullRequestTitle,
  formatPullRequestChanges,
  formatPullRequestCreationTime,
  formatPullRequestMergeTime,
  formatHeader,
  formatCommentCount,
  formatAuthorUsername,
};
