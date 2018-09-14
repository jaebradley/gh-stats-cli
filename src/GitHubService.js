import octokit from '@octokit/rest';

import buildSearchQuery from './buildSearchQuery';

class Searcher {
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

  async getUsername() {
    const {
      data,
    } = await this.client.users.get();
    return data.login;
  }

  async getCommentedPRs({
    createdBy = null,
    organization = null,
    sortBy = 'updated',
    orderBy = 'desc',
  }) {
    const username = await this.getUsername();
    return this.paginate(this.client.search.issues, {
      q: buildSearchQuery({
        createdBy,
        organization,
        commenter: username,
      }),
      sort: sortBy,
      order: orderBy,
    });
  }

  async getAuthoredPRs({
    createdBy = null,
    organization = null,
    sortBy = 'updated',
    orderBy = 'desc',
  }) {
    const username = await this.getUsername();
    return this.paginate(this.client.search.issues, {
      q: buildSearchQuery({
        createdBy,
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
    sort = null,
    direction = null,
    since = null,
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

export default Searcher;
