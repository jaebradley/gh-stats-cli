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
  } = await github.getCommentedPRs({ createdBy: weekAgo, organization });
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
  console.log(`Totals - Left ${totals.userCommentsCount} comments on ${pullRequestsData.length} PRs and (hopefully) reviewed ${totals.additions - totals.deletions} net new lines\n`);

  const table = new Table({
    head: [
      'Commented PRs',
      'Title',
      'Your Comments',
      'Additions',
      'Deletions',
      'Changed Files',
      'Merged',
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
    isMerged,
  }) => {
    table.push([
      `${owner}/${repository}#${number}`,
      title,
      userCommentsCount,
      additions,
      deletions,
      changedFiles,
      isMerged,
    ]);
  });

  console.log(table.toString());

  const {
    items: authoredPullRequests,
  } = await github.getAuthoredPRs({ createdBy: weekAgo, organization });
  apiCallCount += 1;
  // eslint-disable-next-line no-unused-vars
  const authoredPRsEstimatedApiCallCount = apiCallCount + (2 * authoredPullRequests.length);
  const authoredPullRequestInfo = authoredPullRequests.map(({ html_url: htmlURL, number, title }) => {
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
  const authoredPullRequestsData = await Promise.all(authoredPullRequestInfo.map(async ({
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
    return {
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
  }));

  const authoredPRsTotal = {
    additions: 0,
    deletions: 0,
    mergedCount: 0,
  };

  authoredPullRequestsData.forEach(({ additions, deletions, isMerged }) => {
    authoredPRsTotal.additions += additions;
    authoredPRsTotal.deletions += deletions;
    authoredPRsTotal.mergedCount += isMerged;
  });

  console.log('API Call Count', apiCallCount);
  console.log(`Totals - ${authoredPRsTotal.mergedCount} merged PRs and ${authoredPRsTotal.additions - authoredPRsTotal.deletions} net new lines\n`);

  const authoredPRTable = new Table({
    head: [
      'Authored PRs',
      'Title',
      'Additions',
      'Deletions',
      'Changed Files',
      'Merged',
    ],
  });

  authoredPullRequestsData.forEach(({
    title,
    owner,
    repository,
    number,
    additions,
    deletions,
    changedFiles,
    isMerged,
  }) => {
    authoredPRTable.push([
      `${owner}/${repository}#${number}`,
      title,
      additions,
      deletions,
      changedFiles,
      isMerged,
    ]);
  });

  console.log(authoredPRTable.toString());
};

export default getWeeklyContributionStats;
