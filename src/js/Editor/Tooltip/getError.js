const getError = (el, errors) => {
  const errorKey = Object.keys(ValidityState.prototype).find((key) => {
    if (!el.name) return false;
    if (key === 'valid') return false;

    return el.validity[key];
  });

  if (!errorKey) return false;

  return errors[el.name][errorKey];
};

export default getError;
