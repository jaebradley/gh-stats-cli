import {
  getPersonalAccessToken,
  getUsername,
} from './store';

import executeSetup from './setup';
import query from './prompts/query';
import {
  CONTRIBUTION_TYPE,
} from './constants';

import ContributionStatisticsService from './ContributionStatisticsService';
import AuthoredPullRequestsTable from './tables/AuthoredPullRequestsTable';
import CommentedPullRequestsTable from './tables/CommentedPullRequestsTable';
import PullRequestsSummaryTable from './tables/PullRequestsSummaryTable';

const calculateContributionTotals = ({ contributions, type }) => contributions.reduce((
  totalContributions,
  currentContribution,
) => {
  const {
    header,
    totals,
    additions,
    deletions,
    changedFiles,
  } = totalContributions;
  const {
    additions: currentContributionAdditions,
    deletions: currentContributionDeletions,
    changedFiles: currentContributionChangedFiles,
  } = currentContribution;
  const totalIncrementValue = (
    type === CONTRIBUTION_TYPE.PULL_REQUEST_COMMENTER
      && currentContribution.userCommentsCount
  ) || 1;
  return {
    header,
    totals: totals + totalIncrementValue,
    additions: additions + currentContributionAdditions,
    deletions: deletions + currentContributionDeletions,
    changedFiles: changedFiles + currentContributionChangedFiles,
  };
}, {
  header: (type === CONTRIBUTION_TYPE.PULL_REQUEST_COMMENTER && 'Comented PRs') || 'Authored PRs',
  totals: 0,
  additions: 0,
  deletions: 0,
  changedFiles: 0,
});

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

  const authoredPullRequestTotals = calculateContributionTotals({
    contributions: authorStatistics,
    type: CONTRIBUTION_TYPE.PULL_REQUEST_AUTHOR,
  });

  const commentedPullRequestTotals = calculateContributionTotals({
    contributions: commenterStatistics,
    type: CONTRIBUTION_TYPE.PULL_REQUEST_COMMENTER,
  });

  const combinedContributionTotals = [
    authoredPullRequestTotals,
    commentedPullRequestTotals,
  ];

  const pullRequestsSummaryTable = new PullRequestsSummaryTable(combinedContributionTotals);
  const authoredPullRequestsTable = new AuthoredPullRequestsTable(authorStatistics);
  const commentedPullRequestsTable = new CommentedPullRequestsTable(commenterStatistics);

  console.log(pullRequestsSummaryTable.toString());
  console.log(authoredPullRequestsTable.toString());
  console.log(commentedPullRequestsTable.toString());
};

export default getContributionStatistics;
