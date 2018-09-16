import Table from 'cli-table3';

import {
  formatPullRequestIdentifier,
  formatPullRequestTitle,
  formatPullRequestChanges,
  formatPullRequestCreationTime,
  formatPullRequestMergeTime,
  formatHeader,
  formatCommentCount,
  formatAuthorUsername,
} from './formatters';

class CommentedPullRequestsTable {
  constructor(contributionData) {
    this.contributionData = contributionData;

    this.table = new Table({
      head: [
        formatHeader('Commented PRs'),
        formatHeader('Title'),
        formatHeader('Author'),
        formatHeader('Comments'),
        formatHeader('Changes'),
        formatHeader('Created At'),
        formatHeader('Merged At'),
      ],
    });
  }

  toString() {
    this.contributionData.forEach(({
      title,
      owner,
      repository,
      number,
      authorUsername,
      userCommentsCount,
      additions,
      deletions,
      changedFiles,
      mergedAt,
      createdAt,
    }) => {
      this.table.push([
        formatPullRequestIdentifier({
          owner,
          repository,
          number,
        }),
        formatPullRequestTitle(title),
        formatAuthorUsername(authorUsername),
        formatCommentCount(userCommentsCount),
        formatPullRequestChanges({
          additions,
          deletions,
          changedFiles,
        }),
        formatPullRequestCreationTime(createdAt),
        formatPullRequestMergeTime(mergedAt),
      ]);
    });

    return this.table.toString();
  }
}

export default CommentedPullRequestsTable;
