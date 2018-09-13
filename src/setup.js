/* eslint-disable no-console */

import {
  updatePersonalAccessToken,
} from './store';
import setup from './prompts/setup';

const executeSetup = async () => {
  try {
    const {
      personalAccessToken,
    } = await setup();

    await updatePersonalAccessToken(personalAccessToken);
    console.log('✅  Success');
  } catch (e) {
    console.error('❌  Failed');
  }
};

export default executeSetup;
