export function getAuthToken() {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("authToken");
  }
  return null;
}
export function isLoggedIn() {
  if (getAuthToken()) return true;
  return false;
}
