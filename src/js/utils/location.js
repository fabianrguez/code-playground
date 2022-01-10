export const getUrlParams = () => {
  return decodeURIComponent(window.location.search)
    .substring(1)
    .split('&')
    .map((param) => {
      const [key, value] = param.split('=');
      return { [key]: value };
    })
    .reduce((acc, param) => ({ ...acc, ...param }), {});
};

export const updateUrlCodeParam = (value) => {
  window.history.replaceState(null, null, `?code=${value}`);
};
