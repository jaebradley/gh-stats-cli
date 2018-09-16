import parseGitHubURL from 'parse-github-url';

import GitHubService from './GitHubService';

class ContributionStatisticsService {
  static parsePullRequestInformation(pullRequests) {
    return pullRequests.map(({ html_url: htmlURL, number, title }) => {
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
  }

  constructor({ personalAccessToken, username }) {
    this.github = new GitHubService(personalAccessToken);
    this.username = username;
  }

  async getPullRequestDetails({
    title,
    owner,
    repository,
    number,
  }) {
    const {
      created_at: createdAt,
      merged,
      merged_at: mergedAt,
      comments,
      review_comments: reviewComments,
      commits,
      additions,
      deletions,
      changed_files: changedFiles,
      user,
    } = await this.github.getPRDetails({ owner, repository, number });
    return {
      title,
      number,
      owner,
      repository,
      additions,
      deletions,
      changedFiles,
      createdAt,
      mergedAt,
      authorUsername: user.login,
      isMerged: merged,
      commentsCount: comments,
      reviewCommentsCount: reviewComments,
      commitsCount: commits,
    };
  }

  async getCommentedPullRequestDetails({
    title,
    owner,
    repository,
    number,
  }) {
    const pullRequest = await this.getPullRequestDetails({
      title,
      owner,
      repository,
      number,
    });
    const commentsDetails = await this.github.getPRComments({ repository, number, owner });
    const userComments = commentsDetails.filter(({ user }) => user.login === this.username);
    pullRequest.userCommentsCount = userComments.length;
    return pullRequest;
  }

  async getCommentContributionStatistics({
    createdAfter,
    username,
    organization = null,
  }) {
    const commentedPullRequests = await this.github.getCommentedPRs({
      createdAfter,
      username,
      organization,
    });
    const commentedPullRequestsInformation = ContributionStatisticsService
      .parsePullRequestInformation(commentedPullRequests);

    return Promise.all(commentedPullRequestsInformation.map(
      pullRequestInformation => this.getCommentedPullRequestDetails(pullRequestInformation),
    ));
  }

  async getAuthorContributionStatistics({
    createdAfter,
    username,
    organization = null,
  }) {
    const authoredPullRequests = await this.github.getAuthoredPRs({
      createdAfter,
      username,
      organization,
    });

    const authoredPullRequestInformation = ContributionStatisticsService
      .parsePullRequestInformation(authoredPullRequests);

    return Promise.all(authoredPullRequestInformation.map(
      pullRequestInformation => this.getPullRequestDetails(pullRequestInformation),
    ));
  }
}

export default ContributionStatisticsService;
