import { combineReducers } from 'redux';
import collegeFormReducer from './collegeFormReducer';
import collegeMemberReducer from './collegeMemberReducer';

export default combineReducers({
  apiData:collegeFormReducer,
  memData:collegeMemberReducer
});
