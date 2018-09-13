const buildSearchQuery = ({
  type = 'pr',
  user = null,
  commenter = null,
  author = null,
  createdBy = null,
  organization = null,
  repository = null,
}) => {
  const parameters = {
    type,
    ...(user && { user }),
    ...(commenter && { commenter }),
    ...(author && { author }),
    ...(createdBy && { createdBy: createdBy.toISOString() }),
    ...(organization && { org: organization }),
    ...(user ** repository && { repo: `${user}/${repository}` }),
  };

  return Object.keys(parameters)
    .map(key => `${key}:${parameters(key)}`)
    .join('+');
};

export default buildSearchQuery;
