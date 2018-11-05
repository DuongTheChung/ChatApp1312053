import userReducer from './userReducer';
import firebaseReducer  from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer=combineReducers({
    user:userReducer,
    firebase:firebaseReducer


});

export default rootReducer;