import * as actionTypes from '../actions/types';

const initState={
    authError:null
}

const authReducer=(state=initState,action)=>{
    switch(action.type){
        case actionTypes.LOGIN_ERROR:
            return {
                ...state,
                authError:'Login failed'
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                authError:null
            }
        case actionTypes.LOGOUT_SUCCESS:
            console.log('Sign out success');
            return state;
        default:
            return state;
    }
}

export default authReducer;