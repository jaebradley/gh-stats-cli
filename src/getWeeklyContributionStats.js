import parseGitHubURL from 'parse-github-url';
import Table from 'cli-table3';

import {
  getPersonalAccessToken,
} from './store';

import GitHubService from './GitHubService';

import query from './prompts/query';

const getWeekAgo = () => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  return weekAgo;
};

const getWeeklyContributionStats = async () => {
  const personalAccessToken = await getPersonalAccessToken();
  const {
    organization,
  } = await query();
  const weekAgo = getWeekAgo();
  const github = new GitHubService(personalAccessToken);
  let apiCallCount = 0;
  const username = await github.getUsername();
  apiCallCount += 1;
  const {
    items: pullRequests,
  } = await github.getCommentedPRs({ createdBy: weekAgo, org: organization });
  apiCallCount += 1;
  // eslint-disable-next-line no-unused-vars
  const estimatedApiCallCount = apiCallCount + (2 * pullRequests.length);
  const pullRequestInfo = pullRequests.map(({ html_url: htmlURL, number, title }) => {
    const {
      owner,
      name: repository,
    } = parseGitHubURL(htmlURL);
    return {
      title,
      owner,
      repository,
      number,
    };
  });
  const pullRequestsData = await Promise.all(pullRequestInfo.map(async ({
    title,
    owner,
    repository,
    number,
  }) => {
    const {
      merged,
      comments,
      review_comments: reviewComments,
      commits,
      additions,
      deletions,
      changed_files: changedFiles,
    } = await github.getPRDetails({ owner, repository, number });
    apiCallCount += 1;
    const pullRequest = {
      title,
      number,
      owner,
      repository,
      additions,
      deletions,
      changedFiles,
      isMerged: merged,
      commentsCount: comments,
      reviewCommentsCount: reviewComments,
      commitsCount: commits,
    };
    const commentsDetails = await github.getPRComments({ repository, number, owner });
    apiCallCount += 1;
    const userCommentsCount = commentsDetails.filter(({ user }) => user.login === username).length;
    pullRequest.userCommentsCount = userCommentsCount;
    return pullRequest;
  }));

  const totals = {
    additions: 0,
    deletions: 0,
    userCommentsCount: 0,
  };

  pullRequestsData.forEach(({ additions, deletions, userCommentsCount }) => {
    totals.additions += additions;
    totals.deletions += deletions;
    totals.userCommentsCount += userCommentsCount;
  });

  console.log('API Call Count', apiCallCount);
  console.log(`Totals - ${totals.userCommentsCount} comments and ${totals.additions - totals.deletions} net new lines\n`);

  const table = new Table({
    head: [
      '',
      'Title',
      'Your Comments',
      'Additions',
      'Deletions',
      'Changed Files',
    ],
  });

  pullRequestsData.forEach(({
    title,
    owner,
    repository,
    number,
    additions,
    deletions,
    userCommentsCount,
    changedFiles,
  }) => {
    table.push([
      `${owner}/${repository}#${number}`,
      title,
      userCommentsCount,
      additions,
      deletions,
      changedFiles,
    ]);
  });

  console.log(table.toString());
};

export default getWeeklyContributionStats;
