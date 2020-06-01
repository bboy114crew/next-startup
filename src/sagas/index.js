import { all, fork } from "redux-saga/effects";

import issue from "./issue";

function* rootSaga() {
  yield all([
    fork(issue),

  ]);
}

export default rootSaga;