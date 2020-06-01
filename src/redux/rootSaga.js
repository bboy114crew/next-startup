import { all, fork } from "redux-saga/effects";
import issue from 'src/redux/issue/saga';

function* rootSaga() {
  yield all([
    fork(issue),
  ]);
}

export default rootSaga;