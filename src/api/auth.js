import { postRequestWithoutAutherization } from "./_setup";

export function postLoginGoogle(body) {
  return postRequestWithoutAutherization(`/auth/login/google`, body);
}
