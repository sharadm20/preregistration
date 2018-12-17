import {
    FETCH_STATES,
    FETCH_COLLEGES,
    FETCH_VENUES,
    GET_TOKEN_BEGIN,
    GET_TOKEN_SUCCESS,
    GET_TOKEN_ERROR,
    GET_VENUE_TYPE,
    FORM_SUBMIT
} from '../actions/types';

const initialState = {
    stateArray: [],
    collegeArray: [],
    venueArray:[],
    token:{},
    venueType:{},
    formObj:{},
    isLoading : false,
    hasLoaded: false,
    errorMessage: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_STATES:
            return {  
                ...state,
                stateArray: action.payload
            }

        case FETCH_COLLEGES:
            return {
                ...state,
                collegeArray: action.payload
            }

        case FETCH_VENUES:
                return {
                    ...state,
                    venueArray: action.payload
                }
        case GET_TOKEN_BEGIN:
                return {
                      ...state,
                      isLoading: true
                    }
        case GET_TOKEN_SUCCESS:
              return {
                  ...state,
                  isLoading: false,
                  hasLoaded: true,
                  token: action.payload
              }
        case GET_TOKEN_ERROR:
          return {
              ...state,
              isLoading: false,
              hasLoaded: false,
              errorMessage: action.payload.message
          }
        case GET_VENUE_TYPE:
                return {
                    ...state,
                    venueType: action.payload
                      }
        
        case FORM_SUBMIT:
                return{
                    ...state,
                    formObj: action.payload
                }              
      default:
            return state;


    }
}
