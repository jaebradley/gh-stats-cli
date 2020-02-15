import keytar from 'keytar';

const SERVICE_NAME = 'gh-stats-cli';
const PERSONAL_ACCESS_TOKEN_FIELD_NAME = 'personal-access-token';
const GITHUB_USERNAME_FIELD_NAME = 'github-username';

const savePersonalAccessToken = (personalAccessToken) => keytar.setPassword(
  SERVICE_NAME,
  PERSONAL_ACCESS_TOKEN_FIELD_NAME,
  personalAccessToken,
);
const saveUsername = (username) => keytar.setPassword(
  SERVICE_NAME,
  GITHUB_USERNAME_FIELD_NAME,
  username,
);

const getPersonalAccessToken = () => keytar.getPassword(
  SERVICE_NAME,
  PERSONAL_ACCESS_TOKEN_FIELD_NAME,
);
const getUsername = () => keytar.getPassword(SERVICE_NAME, GITHUB_USERNAME_FIELD_NAME);

const hasPersonalAccessToken = async () => {
  const token = await getPersonalAccessToken();
  return !!token;
};
const hasUsername = async () => {
  const username = await getUsername();
  return !!username;
};

const deletePersonalAccessToken = () => keytar.deletePassword(
  SERVICE_NAME,
  PERSONAL_ACCESS_TOKEN_FIELD_NAME,
);
const deleteUsername = () => keytar.deletePassword(SERVICE_NAME, GITHUB_USERNAME_FIELD_NAME);

const updatePersonalAccessToken = async (personalAccessToken) => {
  await deletePersonalAccessToken();
  return savePersonalAccessToken(personalAccessToken);
};
const updateUsername = async (username) => {
  await deleteUsername();
  return saveUsername(username);
};

export {
  savePersonalAccessToken,
  saveUsername,
  getPersonalAccessToken,
  getUsername,
  hasPersonalAccessToken,
  hasUsername,
  deletePersonalAccessToken,
  deleteUsername,
  updatePersonalAccessToken,
  updateUsername,
};
