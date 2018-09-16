import octokit from '@octokit/rest';

import buildSearchQuery from './buildSearchQuery';

class GitHubService {
  constructor(personalAccessToken) {
    this.client = octokit();
    this.client.authenticate({
      type: 'token',
      token: personalAccessToken,
    });
  }

  async paginate(method, args) {
    let response = await method(args);

    let {
      data,
    } = response;
    while (this.client.hasNextPage(response)) {
      // eslint-disable-next-line no-await-in-loop
      response = await this.client.getNextPage(response);
      data = data.concat(response.data);
    }
    return data;
  }

  async getCommentedPRs({
    username,
    createdAfter = null,
    createdBefore = null,
    organization = null,
    sortBy = 'updated',
    orderBy = 'desc',
  }) {
    return this.paginate(this.client.search.issues, {
      q: buildSearchQuery({
        createdAfter,
        createdBefore,
        organization,
        commenter: username,
      }),
      sort: sortBy,
      order: orderBy,
    });
  }

  async getAuthoredPRs({
    username,
    createdAfter = null,
    createdBefore = null,
    organization = null,
    sortBy = 'updated',
    orderBy = 'desc',
  }) {
    return this.paginate(this.client.search.issues, {
      q: buildSearchQuery({
        createdAfter,
        createdBefore,
        organization,
        author: username,
      }),
      sort: sortBy,
      order: orderBy,
    });
  }

  async getPRComments({
    owner,
    repository,
    number,
  }) {
    return this.paginate(this.client.pullRequests.getComments, {
      number,
      owner,
      repo: repository,
    });
  }

  async getPRDetails({
    owner,
    repository,
    number,
  }) {
    const response = await this.client.pullRequests.get({
      number,
      owner,
      repo: repository,
    });
    return response.data;
  }
}

export default GitHubService;
