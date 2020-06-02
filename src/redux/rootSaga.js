import { all } from "redux-saga/effects";
import { loadIssuesStart } from "src/redux/issue/saga";

function* rootSaga() {
  yield all([loadIssuesStart()]);
}

export default rootSaga;
