import axios from "axios";
import { getAuthToken } from "@/utils/helpers";

const BASE_URL = process.env.API_BASE_URL;
const headers = {
  "Content-Type": "application/json",
};

const Client = axios.create({
  baseURL: BASE_URL,
  Authorization: `Bearer ${getAuthToken()}`,
});

export function getRequest({ path, query }) {
  return Client.get(path, {
    params: query,
    headers,
  });
}

export const getRequestWithBody = (path, body) => {
  return Client.post(path, body, {
    headers,
  });
};

export const postRequest = (path, data) => {
  return Client.post(path, data, {
    headers,
  });
};

export const postRequestWithoutAutherization = (path, data) => {
  return axios
    .create({
      baseURL: BASE_URL,
    })
    .post(path, data, {
      headers,
    });
};

export const patchRequest = (path, data) => {
  return Client.patch(path, data, {
    headers,
  });
};

export const deleteRequest = (path, params) => {
  return Client.delete(path, {
    params: params,
    headers,
  });
};
