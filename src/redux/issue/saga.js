import {
  put,
  takeLatest,
} from "redux-saga/effects";
import es6promise from 'es6-promise'
import axios from "axios";
import { LOAD_ISSUES } from "./type";
import {loadIssuesSuccess, loadIssuesFailed} from './action';
es6promise.polyfill()

function* loadIssuesAsync() {
  const url = `https://api.github.com/repos/rails/rails/issues?per_page=25&page=1`;
  try {
    const { data } = yield axios.get(url);
    yield put(loadIssuesSuccess(data));
  } catch (err) {
    yield put(loadIssuesFailed(err));
  }
}

export function* loadIssuesStart() {
  yield takeLatest(LOAD_ISSUES, loadIssuesAsync);
}
