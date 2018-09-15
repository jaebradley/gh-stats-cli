/* eslint-disable no-console */

import {
  updateUsername,
  updatePersonalAccessToken,
} from './store';
import setup from './prompts/setup';
import GitHubService from './GitHubService';

const executeSetup = async () => {
  try {
    const {
      personalAccessToken,
    } = await setup();

    const github = new GitHubService(personalAccessToken);
    const username = await github.getUsername();

    await updatePersonalAccessToken(personalAccessToken);
    await updateUsername(username);
    console.log('✅  Success');
  } catch (e) {
    console.error('❌  Failed');
  }
};

export default executeSetup;
