import parseGitHubURL from 'parse-github-url';

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
  const {
    items: pullRequests,
  } = await github.getCommentedPRs({ createdBy: weekAgo, org: organization });
  const pullRequestInfo = pullRequests.map(({ html_url: htmlURL, number }) => {
    const {
      owner,
      name: repository,
    } = parseGitHubURL(htmlURL);
    return {
      owner,
      repository,
      number,
    };
  });
  const comments = await github.getPRComments(pullRequestInfo[0]);
  console.log(comments);
};

export default getWeeklyContributionStats;
