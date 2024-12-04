export function postLoginGoogle(body) {
  return postRequest(`/auth/login/google`, body);
}
