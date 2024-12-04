export function getAuthToken() {
  return localStorage.getItem("authToken");
}
export function isLoggedIn() {
  if (getAuthToken()) return true;
  return false;
}
