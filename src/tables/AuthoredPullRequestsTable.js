import Table from 'cli-table3';

import {
  formatPullRequestIdentifier,
  formatPullRequestTitle,
  formatPullRequestChanges,
  formatPullRequestCreationTime,
  formatPullRequestMergeTime,
  formatHeader,
} from './formatters';

class AuthoredPullRequestsTable {
  constructor({ data, shouldDisplayOrganizationInGitHubURL }) {
    this.contributionData = data;
    this.shouldDisplayOrganizationInGitHubURL = shouldDisplayOrganizationInGitHubURL;

    this.table = new Table({
      head: [
        formatHeader('Authored PRs'),
        formatHeader('Title'),
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
      additions,
      deletions,
      changedFiles,
      mergedAt,
      createdAt,
    }) => {
      this.table.push([
        formatPullRequestIdentifier({
          ...(this.shouldDisplayOrganizationInGitHubURL && { owner }),
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
