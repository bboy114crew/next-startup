import { applyMiddleware, createStore, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { HYDRATE, createWrapper } from "next-redux-wrapper";
import rootSaga from "./rootSaga";
import issue from "./issue/reducer";

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const combinedReducer = combineReducers({
  issue,
});

export const isServer = !(
  typeof root !== "undefined" &&
  root.document &&
  root.document.createElement
);

const reducer = (state, action) => {
  if (action.type === '__NEXT_REDUX_WRAPPER_HYDRATE__') {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};


export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducer,
    bindMiddleware([sagaMiddleware])
  );

  store.sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: true });
