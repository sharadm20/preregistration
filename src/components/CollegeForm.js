import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FormDisplay from './FormDisplay';
import { getToken } from '../actions/fetchActions';


class CollegeForm extends Component{


componentDidMount(){
  this.props.getToken(process.env.REACT_APP_USERNAME, process.env.REACT_APP_PASSWORD);
  
}




 render(){
  
  if(this.props.errorMessage!==null){
    return <div > Error!{
      this.props.errorMessage
    } </div>;
  }
  if (this.props.isLoading) {
    return <div > Loading... </div>;
  } 
             if(this.props.hasLoaded){
  
            return (<FormDisplay/>);  
            }
   return <div> Loading... </div>;
      //else loop
 }
}

CollegeForm.propTypes = {
 
    getToken:PropTypes.func.isRequired,
    formObj:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  
    formObj:state.apiData.formObj,
    isLoading:state.apiData.isLoading,
    hasLoaded:state.apiData.hasLoaded,
    errorMessage:state.apiData.errorMessage,
    token:state.apiData.token
});

export default connect(mapStateToProps,{ getToken})(CollegeForm);
