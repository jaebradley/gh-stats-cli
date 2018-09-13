const formatParameters = ({ key, value }) => {
  if (key === 'created') {
    return `${key}:>=${value.toISOString().slice(0, 19)}Z`;
  }

  return `${key}:${value}`;
};

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
    ...(createdBy && { created: createdBy }),
    ...(organization && { org: organization }),
    ...(user && repository && { repo: `${user}/${repository}` }),
  };

  return Object.keys(parameters)
    .map(key => formatParameters({ key, value: parameters[key] }))
    .join('+');
};

export default buildSearchQuery;
