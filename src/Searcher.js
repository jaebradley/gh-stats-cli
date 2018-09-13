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

  async getCommentedPRs({
    createdBy = null,
    sortBy = 'updated',
    orderBy = 'descending',
  }) {
    const username = await this.client.users.get().login;
    return this.client.search({
      q: buildSearchQuery({
        createdBy,
        commenter: username,
      }),
      sort: sortBy,
      order: orderBy,
    });
  }

  async getAuthoredPRs({
    createdBy = null,
    sortBy = 'updated',
    orderBy = 'descending',
  }) {
    const username = await this.client.users.get().login;
    this.client.search({
      q: buildSearchQuery({
        createdBy,
        author: username,
      }),
      sort: sortBy,
      order: orderBy,
    });
  }
}
