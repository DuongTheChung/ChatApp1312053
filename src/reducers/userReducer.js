import * as actionTypes from '../actions/types';

const intiUserState={
    currentUser:null,
    isLoading:true
}

const user_reducer =(state=intiUserState, action )=>{
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                currentUser:action.payload.currentUser,
                isLoading:false
            }
        case actionTypes.CLEAR_USER:
            return{
                ...intiUserState,
                isLoading:false
            }
        default:
            return state;
    }
}

export default user_reducer;
