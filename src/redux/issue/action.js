import { LOAD_ISSUES_FAILED, LOAD_ISSUES, LOAD_ISSUES_SUCCESSED } from "./type";

export function loadIssuesStart() {
  return {
    type: LOAD_ISSUES,
  };
}
export function loadIssuesSuccess(data) {
  return {
    type: LOAD_ISSUES_SUCCESSED,
    payload: data,
  };
}
export function loadIssuesFailed(error) {
  return {
    type: LOAD_ISSUES_FAILED,
    payload: error,
  };
}
