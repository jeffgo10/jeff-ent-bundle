if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.entando?.widgets['jeff-mfe']?.basePath || './';
}