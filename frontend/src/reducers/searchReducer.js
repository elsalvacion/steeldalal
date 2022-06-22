import {
  SEARCH_ERROR,
  SEARCH_LOADING,
  SEARCH_RESET,
  SEARCH_SUCCESS,
  SET_SEARCH_VALUE,
} from "./types/searchTypes";

export const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_LOADING:
      return {
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        result: action.payload,
      };
    case SEARCH_ERROR:
      return {
        error: action.payload,
      };
    case SEARCH_RESET:
      return {};
    default:
      return state;
  }
};

export const searchValueReducer = (state = { value: "" }, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
      return {
        value: action.payload,
      };
    default:
      return state;
  }
};
