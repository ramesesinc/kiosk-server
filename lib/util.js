const encodeQueryParams = params => {
  const strs = [];
  Object.keys(params).forEach(key => {
    strs.push(`${key}=${encodeURIComponent(params[key])}`);
  })
  return strs.join("&");
}

module.exports = {
  encodeQueryParams
}