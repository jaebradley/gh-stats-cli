import Table from 'cli-table3';

import {
  formatPullRequestStatus,
  formatPullRequestTitle,
  formatPullRequestChanges,
  formatPullRequestCreationTime,
  formatPullRequestMergeTime,
} from './formatters';

class AuthoredPullRequestsTable {
  constructor({ contributionType, contributionData }) {
    this.contributionType = contributionType;
    this.contributionData = contributionData;

    this.table = new Table({
      head: [
        'Authored PRs',
        '🏷️',
        '✏️',
        '📅',
        '🚢',
      ],
    });
  }

  toString() {
    this.contributionData.forEach(({
      title,
      owner,
      repository,
      number,
      additions,
      deletions,
      changedFiles,
      isMerged,
      mergedAt,
      createdAt,
    }) => {
      this.table.push([
        formatPullRequestStatus({
          isMerged,
          owner,
          repository,
          number,
        }),
        formatPullRequestTitle(title),
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

export default AuthoredPullRequestsTable;
