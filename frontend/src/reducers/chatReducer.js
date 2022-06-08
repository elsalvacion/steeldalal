import {
  LOAD_MESSAGES_LOADING,
  LOAD_MESSAGES_SUCCESS,
  LOAD_MESSAGES_RESET,
  LOAD_MESSAGES_ERROR,
  SET_CONNECTION_SOCKET,
  RESET_CONNECTION_SOCKET,
} from "./types/chatTypes";

export const loadMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_MESSAGES_LOADING:
      return {
        loading: true,
      };
    case LOAD_MESSAGES_SUCCESS:
      return {
        messages: action.payload,
      };
    case LOAD_MESSAGES_ERROR:
      return {
        error: action.payload,
      };
    case LOAD_MESSAGES_RESET:
      return {};

    default:
      return state;
  }
};

export const socketReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CONNECTION_SOCKET:
      return {
        socket: action.payload,
      };
    case RESET_CONNECTION_SOCKET:
      return {};

    default:
      return state;
  }
};
