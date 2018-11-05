import userReducer from './userReducer';
import channelReducer from './channelReducer';
import firebaseReducer  from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer=combineReducers({
    user:userReducer,
    channel:channelReducer,
    firebase:firebaseReducer


});

export default rootReducer;