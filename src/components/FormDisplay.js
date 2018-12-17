import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchStates, fetchColleges, fetchVenues, getVenueType, formData } from '../actions/fetchActions';
import CollegeMember from './CollegeMember';


class FormDisplay extends Component{
  constructor(props) {
    super(props);
   
  this.state = {
    state:'',
    venue:'',
    loi:'',
    college:'',
    count:'',
    errors: {},
    errorClass:{},
    isValidated: false,
    hasToken: false,
    collegeArray:{}
  }
    
}
onChange=(field,e)=> {
  
    if(field==="state"){
      this.setState({[e.target.name]:e.target.value});
    this.props.fetchColleges(e.target.value,this.props.token);
    this.setState({collegeArray:this.props.colleges});
    }
    else if(field==="venue"){
      this.setState({
        [e.target.name]: e.target.value
      });
      this.props.getVenueType(e.target.value,this.props.token);
    }
    else{
      this.setState({
        [e.target.name]: e.target.value
      });
    }
   
}



componentDidMount(){

  this.props.fetchStates(this.props.token);
  this.props.fetchVenues(this.props.token);
  
}

handleSubmit=(e)=> {
  e.preventDefault();
  if(this.handleValidation()){
    
  this.props.formData(e);
  this.setState({isValidated:true});
  }
  
}

handleValidation=()=>{
  
   let errors = {};
   let errorClass={};
   let formIsValid = true;
   if(!this.state.state){
     formIsValid = false;
     errors["state"] = "State is required";
     errorClass["state"]="is-danger";
   }
   if (!this.state.college) {
     formIsValid = false;
     errors["college"] = "College is required";
     errorClass["college"] = "is-danger";
   }
   if (!this.state.venue) {
     formIsValid = false;
     errors["venue"] = "Venue is required";
     errorClass["venue"] = "is-danger";
   }
   if (!this.state.count) {
     formIsValid = false;
     errors["count"] = "Number of member is required";
     errorClass["count"] = "is-danger";
   }
  this.setState({errors: errors});
  this.setState({ errorClass: errorClass });
 
  return formIsValid;
}



 render(){

     const stateItems=this.props.states && this.props.states.map(data => (
           <option key={data.id} value = {data.name} > {data.name} </option>
            ));

            const collegeItems=this.props.colleges && this.props.colleges.map(data => (
           <option key={data.college_name} value = {data.clg_code} > {data.college_name} </option>
            ));
          
          
            const venueItems=this.props.venues && this.props.venues.map(venue => (
                           <option key={venue.id} value = {venue.id} > {venue.college_name} </option>
                       )); 
   return (this.state.isValidated?<CollegeMember/>:(<div className="message is-dark has-text-left" >
      <div className="message-header">
        <p>Fill the below details</p>
      </div>
      <div className="message-body">
        <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="label">Select State</label>
          <div className="control">
               <div className={"select " + (this.state.errorClass['state'])}>
                 <select name="state" onChange={this.onChange.bind(this,"state")}><option value='' hidden>Select State</option>
                {stateItems}
              </select>
            </div>
          </div>
          <p className="help is-danger">{this.state.errors['state']}</p>
        </div>

      <div className="field">
      <label className="label">Select Colleges</label>
        <div className="control">
          <div className={"select " + (this.state.errorClass['college'])}>
               <select name="college" onChange={this.onChange.bind(this,"college")}><option value='' hidden>Select College</option>
                {collegeItems}
               </select>
          </div>     
      </div> 
      <p className="help is-danger">{this.state.errors['college']}</p> 
    </div>
  <div className="field">
    <label className="label">Select Venue</label>
  <div className="control">
    <div className="select">
      <select name="venue" onChange={this.onChange.bind(this,"venue")} >
        <option hidden value = ''> Select Venue </option>
        {venueItems}
      </select>
    </div>
  </div>
</div>
<div className="field">
    <VenueType isType={this.props.venueType.type}/>
</div>
  <div className="field">
        <label className="label">Number of attendee:</label>
      <div className="control">
        <div className="select">
          <select name="count" onChange={this.onChange.bind(this,"count")} >
            <option hidden value=''>Select Number of attendees</option>
            <option value="1">1</option>
  					<option value="2">2</option>
  					<option value="3">3</option>
  					<option value="4">4</option>
  					<option value="5">5</option>
  					<option value="6">6</option>
          </select>
        </div>
      </div>
      <p className="help is-danger">{this.state.errors['count']}</p>
    </div>

    <div className="field is-centered">
      <button className="button is-danger" type="submit">Next</button>
    </div>
</form>
</div>
</div>
))
   }
   
}


function VenueType(props){
  const isType=props.isType;
  if(isType===1){
    return <PrincipleMeet/>;
  }
  if (isType===2) {
    return <Workshop/>;
  }
  if (isType===3){
    return <PmWithW/>;
  }
  return null;
}

function PrincipleMeet(props){
  return (

    <div className="card column">
      <header className="card-header has-background-primary">
        <h4 className="card-header-title ">Instruction's for Principle Meet:</h4>
      </header>
      <div className="card-content">
          <div className="content has-text-left">
  					<ol><li> No fees for attending the meet.</li>
  					<li> Please mention accurate information in this form. Your contact information will be used to notify about any updates related to the Principals Meet.</li></ol>
  					Agenda for the meeting:
  					<ol><li>e-Yantra: an overview</li>
  						<li>What is eLSI? Why is it important for you?</li>
  						<li>Discussion of the model and modalities.</li></ol>
  						To know more about eLSI: < a className = "has-text-link"
  						href = 'http://elsi.e-yantra.org/meetWorkshop/elsi'
  						target = '_blank'
  						rel = "noopener noreferrer" > Click Here * </a>
          </div>
        </div>
      </div>

  );
}

function Workshop(props){
  return (
    <div>
    <div className="field columns">
      <label className="column label">Letter of Intent Status(Either hard Copy/Soft Copy):</label>
      <div className="control is-expanded column">
        <div className="select is-fullwidth">
          <select name="loi" onChange={FormDisplay.onChange}>
          <option value='' hidden> -- Select one -- </option>
        <option value="submitted">  Already Submitted</option>
        <option value="submit_before_workshop">
          Submit before Workshop</option>
        <option value="submit_in_workshop">
          Submit in Workshop</option>
        <option value="not_sure">
          Not Sure</option>
        <option value="refresher">
          Already an eLSI college attending refresher course.</option>
      </select>
    </div>
  </div>
  </div>
  <div className="notification is-info">
    Soft copy of LOI can be sent to email: support@e-yantra.org
    </div>
    <div className="card">
      <header className="card-header has-background-primary">
        <h4 className="card-header-title">Instruction's for Workshop:</h4>
      </header>
      <div className="card-content">
        <div className="content has-text-left">
          <ul> <li>The registration is strictly on First Come First Serve (FCFS) basis.</li>
              < li > Preference would be given to teams from those colleges who have given the < a className = "has-text-danger"
              href = 'http://elsi.e-yantra.org/meetWorkshop/loi'
              target ='_blank' rel="noopener noreferrer"> Letter of Intent(LoI) </a></li>
              <li> Four teachers from each college can register.</li>
              <li> No fees for attending the workshop.</li>
              <li>Carry your College Id Card</li>
              <li> Please carry at least one (Windows 7 or above) laptop between a team of four teachers</li>
              <li> Please mention accurate information in this form. Your contact information will be used to notify about any updates related to the workshop.</li>
              <li><b className="has-text-danger">All traveling and staying expenses of the team members attending the workshops are borne by their respective colleges.</b></li>
              <li>Teachers will be given a participation certificate from e-Yantra upon successful participation on <b>both days of the workshop.</b> </li>
              <li>Teacher teams from colleges that have given LoI (Letter of Intent), who have successfully participated on both days of the workshop, will receive a
                <b>robotic kit</b> at the end of the workshop. These teams will participate in the Task Based Training (TBT).</li>
              </ul>
            To know more about eLSI: <a className = "has-text-link" href = 'http://elsi.e-yantra.org/meetWorkshop/elsi' target = '_blank' rel = "noopener noreferrer"> Click Here * </a>
          </div>
        </div>
      </div>
    </div>
  );
}


function PmWithW(props){
  return (
    <div>
    <div className="field columns">
      <label className="column label">Letter of Intent Status(Either hard Copy/Soft Copy):</label>
      <div className="control is-expanded column">
        <div className="select is-fullwidth">
          <select name="loi" onChange={FormDisplay.onChange}>
           <option value = ''
           hidden > --Select one-- </option>
        <option value="submitted">  Already Submitted</option>
        <option value="submit_before_workshop">
          Submit before Workshop</option>
        <option value="submit_in_workshop">
          Submit in Workshop</option>
        <option value="not_sure">
          Not Sure</option>
        <option value="refresher">
          Already an eLSI college attending refresher course.</option>
      </select>
    </div>
  </div>
  </div>
  < div className = "is-8 cotton-red" >
    Soft copy of LOI can be sent to email: support@e-yantra.org
    </div>
    <div className="card">
      <header className="card-header has-background-primary">
        <h4 className="card-header-title">Instruction's for Principle Meet followed by Workshop:</h4>
      </header>
      <div className="card-content clean-khaki">
        <div className="content has-text-left">
      <ul><li>The registration is strictly on First Come First Serve (FCFS) basis.</li>
      < li > Preference would be given to teams from those colleges who have given the < a className = "has-text-danger"
      href = 'http://elsi.e-yantra.org/meetWorkshop/loi'
      target = '_blank'
      rel = "noopener noreferrer" > Letter of Intent(LoI) </a>.</li >
      <li>Four teachers from each college can register.</li>
      <li>No fees for attending the workshop.</li>
      <li>Carry your College Id Card</li>
      <li>Please carry at least one (Windows 7 or above) laptop between a team of four teachers</li>
      <li>Please mention accurate information in this form. Your contact information will be used to notify about any updates related to the workshop.</li>
      <li>All traveling and staying expenses of the team members attending the workshops are borne by their respective colleges.</li>
      <li>Teachers will be given a participation certificate from e-Yantra upon successful participation on both days of the workshop.</li>
      <li>Teacher teams from colleges that have given LoI (Letter of Intent), who have successfully participated on both days of the workshop, will receive a robotic kit at the end of the workshop. These teams will participate in the Task Based Training (TBT).</li>
      <li>No fees for attending the meet.</li>
      <li>Please mention accurate information in this form. Your contact information will be used to notify about any updates related to the Principals Meet.</li></ul>
      <h5 className="has-text-danger">Agenda for the meeting:</h5>
      <p>e-Yantra: an overview</p>
      <ul>
      <li>What is eLSI? Why is it important for you?</li>
      <li>Discussion of the model and modalities.</li>
      <li>Note: College has to nominate 2-4 teachers to attend the workshop after the principals Meet. Although 4 teachers are must for 3 months online Task Based Training followed after the two-day workshop.</li></ul>
      <p> To know more about eLSI: <a className = "has-text-link"
      href = 'http://elsi.e-yantra.org/meetWorkshop/elsi'
      target = '_blank'
      rel = "noopener noreferrer" > Click Here * </a></p>
        </div>
      </div>
    </div>
</div>
  );
}



FormDisplay.propTypes = {
    fetchStates: PropTypes.func.isRequired,
    fetchColleges: PropTypes.func.isRequired,
    getVenueType:PropTypes.func.isRequired,
    fetchVenues: PropTypes.func.isRequired,
    formData: PropTypes.func.isRequired,
    states: PropTypes.array.isRequired,
    colleges:PropTypes.array.isRequired,
    formObj:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    states: state.apiData.stateArray,
    colleges: state.apiData.collegeArray,
    venues:state.apiData.venueArray,
    venueType:state.apiData.venueType,
    formObj:state.apiData.formObj,
    isLoading:state.apiData.isLoading,
    hasLoaded:state.apiData.hasLoaded,
    errorMessage:state.apiData.errorMessage,
    token:state.apiData.token
});

export default connect(mapStateToProps,{fetchStates,fetchColleges, fetchVenues, getVenueType, formData})(FormDisplay);
