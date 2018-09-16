import Table from 'cli-table3';

import {
  formatPullRequestChanges,
  formatHeader,
  formatCommentCount,
} from './formatters';

class PullRequestsSummaryTable {
  constructor(summaryData) {
    this.summaryData = summaryData;

    this.table = new Table({
      head: [
        '',
        formatHeader('Totals'),
        formatHeader('Changes'),
      ],
    });
  }

  toString() {
    this.summaryData.forEach(({
      header,
      totals,
      additions,
      deletions,
      changedFiles,
    }) => {
      this.table.push({
        [formatHeader(header)]: [
          formatCommentCount(totals),
          formatPullRequestChanges({
            additions,
            deletions,
            changedFiles,
          }),
        ],
      });
    });

    return this.table.toString();
  }
}

export default PullRequestsSummaryTable;
