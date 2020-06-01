import { LOAD_ISSUES, LOAD_ISSUES_FAILED, LOAD_ISSUES_SUCCESSED } from "./type";

const initialState = {
  activeNoteId: "",
  error: null,
  loading: false,
  issues: [],
  searchValue: "",
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_ISSUES: {
      return {
        ...state,
        loading: true,
      };
    }
    case LOAD_ISSUES_SUCCESSED: {
      return {
        ...state,
        loading: false,
        issues: payload,
        error: null,
      };
    }
    case LOAD_ISSUES_FAILED: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
}
