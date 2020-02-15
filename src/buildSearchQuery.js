const getFormattedDateTime = (datetime) => datetime.toISOString().slice(0, 19);

const formatParameters = ({ key, value }) => {
  if (key === 'createdAfter') {
    return `created:>=${getFormattedDateTime(value)}Z`;
  }

  if (key === 'createdBefore') {
    return `created:<=${getFormattedDateTime(value)}Z`;
  }

  return `${key}:${value}`;
};

const buildSearchQuery = ({
  type = 'pr',
  user = null,
  commenter = null,
  author = null,
  createdAfter = null,
  createdBefore = null,
  organization = null,
  repository = null,
}) => {
  const parameters = {
    type,
    ...(user && { user }),
    ...(commenter && { commenter }),
    ...(author && { author }),
    ...(createdAfter && { createdAfter }),
    ...(createdBefore && { createdBefore }),
    ...(organization && { org: organization }),
    ...(user && repository && { repo: `${user}/${repository}` }),
  };

  return Object.keys(parameters)
    .map((key) => formatParameters({ key, value: parameters[key] }))
    .join('+');
};

export default buildSearchQuery;
