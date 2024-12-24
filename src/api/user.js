import { getRequest } from "./_setup";

export function getUserProfile() {
  return getRequest(`/user/profile`);
}
