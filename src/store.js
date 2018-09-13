import keytar from 'keytar';

const SERVICE_NAME = 'gh-stats-cli';
const FIELD_NAME = 'personal-access-token';

// eslint-disable-next-line max-len
const savePersonalAccessToken = personalAccessToken => keytar.setPassword(SERVICE_NAME, FIELD_NAME, personalAccessToken);
const getPersonalAccessToken = () => keytar.getPassword(SERVICE_NAME, FIELD_NAME);
const hasPersonalAccessToken = async () => {
  const token = await getPersonalAccessToken();
  return !!token;
};
const deletePersonalAccessToken = () => keytar.deletePassword(SERVICE_NAME, FIELD_NAME);
const updatePersonalAccessToken = async (personalAccessToken) => {
  await deletePersonalAccessToken();
  return savePersonalAccessToken(personalAccessToken);
};

export {
  savePersonalAccessToken,
  getPersonalAccessToken,
  hasPersonalAccessToken,
  deletePersonalAccessToken,
  updatePersonalAccessToken,
};
