import {
  getPersonalAccessToken,
  getUsername,
} from './store';

import executeSetup from './setup';
import query from './prompts/query';

import ContributionStatisticsService from './ContributionStatisticsService';
import AuthoredPullRequestsTable from './tables/AuthoredPullRequestsTable';

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
    specifiedUsername,
  });
  const authorStatistics = await contributionStatisticsService.getAuthorContributionStatistics({
    createdAfter,
    organization,
    username: specifiedUsername,
  });
  const table = new AuthoredPullRequestsTable(authorStatistics);
  console.log(table.toString());
};

export default getContributionStatistics;
