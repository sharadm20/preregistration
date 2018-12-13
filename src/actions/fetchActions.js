import {
    GET_TOKEN_BEGIN,
    GET_TOKEN_SUCCESS,
    GET_TOKEN_ERROR,
    FETCH_STATES,
    FETCH_COLLEGES,
    FETCH_VENUES,
    GET_VENUE_TYPE,
    FORM_SUBMIT,
    FORM_POST_SUCCESS,
    GET_DEPARTMENT_DESIGNATION
} from '../actions/types';

const postheaders={
 'Content-Type': 'application/x-www-form-urlencoded'
};


export const getVenueType = (id,token) => dispatch => {
    fetch(`http://localhost:8001/api/venuesData/${id}?token=${token}`)
        .then(res => res.json())
        .then(venueType =>
            dispatch({
                type: GET_VENUE_TYPE,
                payload: venueType
            })
        );
};


export const getToken = (username, password) =>async dispatch => {
    dispatch({type:  GET_TOKEN_BEGIN});
    return await fetch('http://localhost:8001/api/getToken',{
          method: 'POST',
          headers: postheaders,
          body:JSON.stringify({username,password})
        })
            .then(res => res.json())
            .then((token) =>dispatch({
                    type: GET_TOKEN_SUCCESS,
                    payload:token
            })).catch(error=>dispatch({
                type:GET_TOKEN_ERROR,
                payload:error,
                error:true
            }));
    };


export const fetchStates = (token) =>async dispatch => {
    await fetch(`http://localhost:8001/api/states?token=${token}`)
        .then(res => res.json())
        .then(states => dispatch({
            type: FETCH_STATES,
            payload: states
        }));
};

export const fetchColleges = (state,token) => dispatch => {
    fetch(`http://localhost:8001/api/colleges/${state}?token=${token}`)
        .then(res => res.json())
        .then(colleges =>
            dispatch({
                type: FETCH_COLLEGES,
                payload: colleges
            })
        ).catch(err => console.log('Error:', err));
};

export const fetchVenues=()=>dispatch=>{
       fetch('http://localhost:8001/api/venues')
           .then(res => res.json())
           .then(venues => dispatch({
               type: FETCH_VENUES,
               payload: venues
           })
           );
};

export const formData = (data) => dispatch =>{ 
    const formData = new FormData(data.target);
    const form = Array.from(formData.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
    }), {});   
    dispatch({
                type: FORM_SUBMIT,
                payload: form
            });
        }

export const submitForm = (data,token) => dispatch => {
    const formData = new FormData(data.target);
    const form = Array.from(formData.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
    }), {});
   fetch(`http://localhost:8001/api/formSubmit?token=${token}`,{
          method: 'POST',
          headers: postheaders,
          body:JSON.stringify(form)
        })
       .then(res => res.json())
       .then(formOb => dispatch({
           type: FORM_POST_SUCCESS,
           payload: formOb
       }))
       .then(res=>console.log(res))
       .catch(err => console.log('Error:', err));
}

   export const getDesignationDepartment = () => dispatch => {
       fetch('http://localhost:8001/api/designation/department/list')
           .then(res => res.json())
           .then(list => dispatch({
               type: GET_DEPARTMENT_DESIGNATION,
               payload: list
           })).catch(err => console.log('Error:', err));
   }