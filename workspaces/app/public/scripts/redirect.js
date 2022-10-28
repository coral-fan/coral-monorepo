if (localStorage.getItem('logout_redirect_url')) {
  var redirectUrl = localStorage.getItem('logout_redirect_url');
  localStorage.removeItem('logout_redirect_url');
  window.location.replace(redirectUrl);
}
