import apiService from "../apiService";

const apiPath = "/api";

export const userService = {
  POST_LOGIN: (params) => {
    return apiService.post(`${apiPath}/auth/login`, params);
  },
  POST_LOGOUT: (params) => {
    return apiService.post(`${apiPath}/login/logout`, params);
  },
  POST_SIGNUP: (params) => {
    return apiService.post(`${apiPath}/auth/register`, params);
  },
  GET_MY_PROFILE: (params) => {
    return apiService.get(`${apiPath}/auth/me`, params);
  },
  PUT_UPDATE_PROFILE: (id, params) => {
    return apiService.put(`${apiPath}/users/${id}`, params);
  },
  RESET_PASSWORD: (id, params) => {
    return apiService.patch(`${apiPath}/users/${id}/password`, params);
  },
  GET_ADMIN_PUBLIC: () => {
    return apiService.get(`${apiPath}/users/public`);
  },

  // category
  GET_CATEGORY: (queryString) => {
    return apiService.get(
      `${apiPath}/categories${queryString ? queryString : ""}`
    );
  },
  GET_CATEGORY_BY_ID: (id, params) => {
    return apiService.get(`${apiPath}/categories/${id}`, params);
  },
  POST_CREATE_CATEGORY: (params) => {
    return apiService.post(`${apiPath}/categories`, params);
  },
  PUT_EDIT_CATEGORY: (id, params) => {
    return apiService.put(`${apiPath}/categories/${id}`, params);
  },
  DELETE_CATEGORY: (id) => {
    return apiService.delete(`${apiPath}/categories/${id}`);
  },

  // ARTICLE
  GET_ARTICLE: (queryString) => {
    return apiService.get(`${apiPath}/blogs${queryString ? queryString : ""}`);
  },
  GET_ARTICLE_BY_ID: (id, params) => {
    return apiService.get(`${apiPath}/blogs/${id}`, params);
  },
  POST_CREATE_ARTICLE: (params) => {
    return apiService.post(`${apiPath}/blogs`, params);
  },
  PUT_EDIT_ARTICLE: (id, params) => {
    return apiService.put(`${apiPath}/blogs/${id}`, params);
  },
  DELETE_ARTICLE: (id) => {
    return apiService.delete(`${apiPath}/blogs/${id}`);
  },

  // notification

  GET_NOTIFICATION: () => {
    return apiService.get(`${apiPath}/notification`);
  },

  // file upload
  POST_FILE_UPLOAD: (params) => {
    return apiService.post_formdata(`${apiPath}/files/upload`, params);
  },
  DELETE_FILE: (params) => {
    return apiService.delete(`${apiPath}/files/delete`, params);
  },
};
