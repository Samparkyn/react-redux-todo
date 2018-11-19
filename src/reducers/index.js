import { combineReducers } from 'redux';

//reducers
import todo from './todo';


const rootReducer = combineReducers({
  todo
});

export default rootReducer;