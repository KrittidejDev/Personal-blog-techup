import apiService from "../apiService";

const apiPath = "/api";

export const userService = {
  POST_LOGIN: (params) => {
    return apiService.post(`${apiPath}/member/login`, params);
  },
  POST_LOGOUT: (params) => {
    return apiService.post(`${apiPath}/login/logout`, params);
  },

  POST_SIGNUP: (params) => {
    return apiService.post(`${apiPath}/member/register`, params);
  },

  POST_MEMBER_REGISTER: (params) => {
    return apiService.post(`${apiPath}/member/register`, params);
  },
  POST_UPLOAD_MEMBER_MEDIA: (params) => {
    return apiService.post_formdata(`${apiPath}/media/upload/member`, params);
  },
  POST_MEDIA_DELETE: (params) => {
    return apiService.post(`${apiPath}/media/delete`, params);
  },

  // ACCOUNT
  GET_ACCOUNT_MY_TRANSACTION_LIST: () => {
    return apiService.get(`${apiPath}/account-transaction/my-transactions`);
  },
  GET_ACCOUNT_SUMMARY_DETAIL: (id) => {
    return apiService.get(`${apiPath}/account-transaction/my-summary`);
  },

  // AUCTION BOARD
  GET_AUCTION_BOARD_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/auction-board${queryString ? queryString : ""}`
    );
  },
  GET_AUCTION_BOARD_DETAIL: (id) => {
    return apiService.get(`${apiPath}/auction-board/${id}`);
  },
  GET_AUCTION_BID_HISTORY: (auctionId) => {
    return apiService.get(`${apiPath}/bid-history/auction/${auctionId}`);
  },

  // Auction Me
  GET_MY_AUCTION_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/auction/me${queryString ? queryString : ""}`
    );
  },
  GET_MY_TRANSACTION: (queryString) => {
    return apiService.get(
      `${apiPath}/member/me/payment${queryString ? queryString : ""}`
    );
  },
  DELETE_MY_AUCTION_DETAIL: (id) => {
    return apiService.delete(`${apiPath}/auction/${id}/my-auction`);
  },

  // AUCTION
  GET_AUCTION_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/auction${queryString ? queryString : ""}`
    );
  },
  GET_AUCTION_DETAIL: (id) => {
    return apiService.get(`${apiPath}/auction/${id}`);
  },
  POST_AUCTION_CREATE: (params) => {
    return apiService.post(`${apiPath}/auction`, params);
  },
  POST_PAYMENT_REPORT_AUCTION: (id, params) => {
    return apiService.post(
      `${apiPath}/auction/${id}/payment/upload-slip`,
      params
    );
  },
  PATCH_SHIPPPING_AUCTION: (id, params) => {
    return apiService.patch(`${apiPath}/auction/${id}/shipping/ship`, params);
  },

  POST_UPLOAD_AUCTION_MEDIA: (params) => {
    return apiService.post_formdata(`${apiPath}/media/upload/auction`, params);
  },

  // ARTICLE
  GET_ARTICLE_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/article${queryString ? queryString : ""}`
    );
  },
  GET_ARTICLE_DETAIL: (id) => {
    return apiService.get(`${apiPath}/article/${id}`);
  },

  // BANNER
  GET_BANNER_LIST: (queryString) => {
    return apiService.get(`${apiPath}/banner${queryString ? queryString : ""}`);
  },

  // BID HISTORY
  GET_BID_HISTORY_BY_AUCTION_LIST: (auction_id) => {
    return apiService.get(`${apiPath}/bid-history/auction/${auction_id}`);
  },
  POST_BID_HISTORY_CREATE: (params) => {
    return apiService.post(`${apiPath}/bid-history`, params);
  },

  // profile
  GET_MEMBER_COUNT: () => {
    return apiService.get(`${apiPath}/member/count`);
  },
  GET_MEMBER_DETAIL: (id) => {
    return apiService.get(`${apiPath}/member/${id}/info-feed`);
  },
  GET_MY_DETAIL: (id) => {
    return apiService.get(`${apiPath}/member/me`);
  },
  GET_MY_PROFILE_DETAIL: (id) => {
    return apiService.get(`${apiPath}/member/me/profile`);
  },
  GET_MY_CONFIG_DETAIL: (id) => {
    return apiService.get(`${apiPath}/member/me/notification-settings`);
  },
  GET_MY_ADDRESS: (queryString) => {
    return apiService.get(
      `${apiPath}/member/me/address${queryString ? queryString : ""}`
    );
  },
  GET_MY_ORDER_HISTORY: (queryString) => {
    return apiService.get(
      `${apiPath}/bid-history/me${queryString ? queryString : ""}`
    );
  },
  PATCH_MY_PROFILE_UPDATE: (params) => {
    return apiService.patch(`${apiPath}/member/me/profile`, params);
  },
  PATCH_MY_NOTIFICATION_SETTING_UPDATE: (params) => {
    return apiService.patch(
      `${apiPath}/member/me/notification-settings`,
      params
    );
  },

  // FEEDBACK
  GET_MY_FEEDBACK: (queryString) => {
    return apiService.get(
      `${apiPath}/feedback${queryString ? queryString : ""}`
    );
  },
  GET_FEEDBACK_COUNT: (queryString) => {
    return apiService.get(
      `${apiPath}/feedback/count${queryString ? queryString : ""}`
    );
  },
  POST_FEEDBACK_CREATE: (params) => {
    return apiService.post(`${apiPath}/feedback`, params);
  },

  // FOLLOW
  GET_MY_FOLLOWING_COUNT: (member_id) => {
    return apiService.get(`${apiPath}/follow//my-count/${member_id}`);
  },
  GET_MY_FOLLOWING_DETAIL: (member_id) => {
    return apiService.get(`${apiPath}/follow/status/${member_id}`);
  },
  POST_FOLLOW_UPDATE: (params) => {
    return apiService.post(`${apiPath}/follow/follow`, params);
  },
  POST_UN_FOLLOW_UPDATE: (params) => {
    return apiService.post(`${apiPath}/follow/unfollow`, params);
  },

  // NOTIFACATION
  GET_NOTIFICATION_UN_COUNT: (queryString) => {
    return apiService.get(
      `${apiPath}/notifications/unread-count${queryString ? queryString : ""}`
    );
  },
  GET_NOTIFICATION_FOLLOEWER_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/notifications/followers${queryString ? queryString : ""}`
    );
  },
  GET_NOTIFICATION_MESSAGE_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/notifications/messages${queryString ? queryString : ""}`
    );
  },
  GET_NOTIFICATION_SYSTEM_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/notifications/system${queryString ? queryString : ""}`
    );
  },

  // REPORT PRA FAKE
  GET_CHECK_FAKE_AUCTION_REPORT: (auctionId, cateType) => {
    return apiService.get(
      `${apiPath}/notifications/messages/check-fake-report/${auctionId}/${cateType}`
    );
  },
  POST_MESSAGE_CREATE: (params) => {
    return apiService.post(`${apiPath}/notifications/messages`, params);
  },

  PUT_NOTIFICATION_READ: (type, id) => {
    return apiService.put(`${apiPath}/notifications/${type}/${id}/read`);
  },
  PUT_NOTIFICATION_READ_ALL: (type) => {
    return apiService.put(`${apiPath}/notifications/${type}/read-all`);
  },

  // COMMENT
  GET_CHECK_COMMENT_REPORT: (referenceType, referenceId) => {
    return apiService.get(
      `${apiPath}/comment/check/${referenceType}/${referenceId}`
    );
  },
  GET_COMMENT_SUMMARY_BY_AUCTION_ID: (auctionId) => {
    return apiService.get(`${apiPath}/comment/voting-results/${auctionId}`);
  },
  POST_COMMENT_CREATE: (params) => {
    return apiService.post(`${apiPath}/comment`, params);
  },

  // get comment
  GET_COMMENT: (queryString) => {
    return apiService.get(
      `${apiPath}/comment${queryString ? queryString : ""}`
    );
  },

  // PAYMENT
  POST_UPLOAD_PAYMENT_MEDIA: (params) => {
    return apiService.post_formdata(`${apiPath}/media/upload/payment`, params);
  },

  GET_HOME_MENU_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/home-menu/active${queryString ? queryString : ""}`
    );
  },

  // CHAT
  GET_CHAT_LIST: (queryString) => {
    return apiService.get(
      `${apiPath}/message-notification/conversations${
        queryString ? queryString : ""
      }`
    );
  },
  GET_CHAT_MESSAGES: (id, memberType, queryString) => {
    return apiService.get(
      `${apiPath}/message-notification/conversation/${id}/${memberType}${
        queryString ? queryString : ""
      }`
    );
  },
  POST_CHAT_SEND: (params) => {
    return apiService.post(`${apiPath}/message-notification/send`, params);
  },
  PATCH_CHATE_READ: (memberId, memberType) => {
    return apiService.patch(
      `${apiPath}/message-notification/conversation/${memberId}/${memberType}/read`
    );
  },
};
// TEMPLATE
// GET_NEW_TEACHER_LIST: (queryString) => {
//   return apiService.get(
//     `${apiPath}/new-teacher${queryString ? queryString : ""}`
//   );
// },
// GET_NEW_TEACHER_DETAIL: (id) => {
//   return apiService.get(`${apiPath}/new-teacher/${id}`);
// },
// POST_TEACHER_HOMEWORK_CREATE: (params) => {
//   return apiService.post(`${apiPath}/homework/teacher`, params);
// },
// PUT_TEACHER_HOMEWORK_UPDATE: (id, params) => {
//   return apiService.put(`${apiPath}/homework/teacher/${id}`, params);
// },
// DELETE_CETIFICATE_DETAIL: (id) => {
//   return apiService.delete(`${apiPortalPath}/certificate/${id}`);
// },
