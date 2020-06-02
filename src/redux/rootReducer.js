import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import issue from './issue/reducer';

const combinedReducer = combineReducers({
  issue,
});

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default reducer;
