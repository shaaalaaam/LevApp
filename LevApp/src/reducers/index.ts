// src/reducers/index.ts

import { combineReducers } from 'redux';
import multiStepFormReducer from './multiStepFormReducer';

const rootReducer = combineReducers({
  multiStepForm: multiStepFormReducer,
});

export default rootReducer;
