const validateExistence = ({ value, type }) => {
  if (value && value.length > 0) {
    return true;
  }

  return `Please enter a valid ${type}`;
};

export {
  validateExistence,
};
