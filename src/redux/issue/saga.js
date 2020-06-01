import {
  put,
  takeLatest,
  all
} from "redux-saga/effects";
import axios from "axios";
import { LOAD_ISSUES } from "./type";
import {loadIssuesSuccess, loadIssuesFailed} from './action';

function* loadIssuesAsync() {
  const url = `https://api.github.com/repos/rails/rails/issues?per_page=25&page=1`;
  try {
    const { data } = yield axios.get(url);
    yield put(loadIssuesSuccess(data));
  } catch (err) {
    yield put(loadIssuesError(err));
  }
}

export function* loadIssuesStart() {
  yield takeLatest(LOAD_ISSUES, loadIssuesAsync);
}

export default function* issueSagas() {
  yield all([loadIssuesStart()]);
}
