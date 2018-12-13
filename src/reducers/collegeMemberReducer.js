import {
GET_DEPARTMENT_DESIGNATION,
FORM_POST_SUCCESS
} from '../actions/types';

const initialState = {
    List: [],
    Saved:[]

}

export default function (state = initialState, action) {
    switch (action.type) {
      
        case GET_DEPARTMENT_DESIGNATION:
            return {
                ...state,
                List: action.payload
            }
        case FORM_POST_SUCCESS:
            return {
                ...state,
                Saved: action.payload
            }
        default:
            return state;


    }
}
