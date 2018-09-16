const CONTRIBUTION_TYPE = Object.freeze({
  COMMENTER: 'COMMENTER',
  AUTHOR: 'AUTHOR',
});

const CONTRIBUTION_TYPE_TO_TABLE_HEADER = Object.freeze({
  [CONTRIBUTION_TYPE.COMMENTER]: 'Commented PRs',
  [CONTRIBUTION_TYPE.AUTHOR]: 'Authored PRs',
});

export {
  CONTRIBUTION_TYPE,
  CONTRIBUTION_TYPE_TO_TABLE_HEADER,
};