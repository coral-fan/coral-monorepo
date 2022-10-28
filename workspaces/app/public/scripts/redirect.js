var WEB3AUTH_LOGOUT_REDIRECT_URL = 'web3auth_logout_redirect_url';
if (localStorage.getItem(WEB3AUTH_LOGOUT_REDIRECT_URL)) {
  var redirectUrl = localStorage.getItem(WEB3AUTH_LOGOUT_REDIRECT_URL);
  localStorage.removeItem(WEB3AUTH_LOGOUT_REDIRECT_URL);
  window.location.replace(redirectUrl);
}
