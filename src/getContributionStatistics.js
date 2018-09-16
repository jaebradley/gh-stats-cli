import {
  getPersonalAccessToken,
  getUsername,
} from './store';

import executeSetup from './setup';
import query from './prompts/query';

import ContributionStatisticsService from './ContributionStatisticsService';
import AuthoredPullRequestsTable from './tables/AuthoredPullRequestsTable';
import CommentedPullRequestsTable from './tables/CommentedPullRequestsTable';

const getContributionStatistics = async (createdAfter) => {
  let personalAccessToken = await getPersonalAccessToken();
  let username = await getUsername();

  if (!personalAccessToken || !username) {
    await executeSetup();
    personalAccessToken = await getPersonalAccessToken();
    username = await getUsername();
  }

  const queryParameters = await query(username);
  const {
    username: specifiedUsername,
    organization,
  } = queryParameters;

  const contributionStatisticsService = new ContributionStatisticsService({
    personalAccessToken,
    username: specifiedUsername,
  });

  const [
    authorStatistics,
    commenterStatistics,
  ] = await Promise.all([
    contributionStatisticsService.getAuthorContributionStatistics({
      createdAfter,
      organization,
      username: specifiedUsername,
    }),
    contributionStatisticsService.getCommentContributionStatistics({
      createdAfter,
      organization,
      username: specifiedUsername,
    }),
  ]);

  const authoredPullRequestsTable = new AuthoredPullRequestsTable(authorStatistics);
  const commentedPullRequestsTable = new CommentedPullRequestsTable(commenterStatistics);

  console.log(authoredPullRequestsTable.toString());
  console.log(commentedPullRequestsTable.toString());
};

export default getContributionStatistics;
