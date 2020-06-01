import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootSaga from "src/sagas";
import count from "src/slices/counter";
import issue from "src/slices/issue";

const combinedReducer = combineReducers({
  count,
  issue,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count) nextState.count = state.count; // preserve count value on client side navigation
    if (state.issue) nextState.issue = state.issue;
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = configureStore({
    reducer: reducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })],
    devTools: process.env.NODE_ENV !== "production",
  });

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
