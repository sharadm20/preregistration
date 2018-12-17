import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDesignationDepartment, submitForm } from '../actions/fetchActions';

class CollegeMember extends Component{
     constructor(props) {
             super(props);
            this.state= {
                errors:{},
                errorClass:{}
            }
     }
    
     componentDidMount(){
       this.props.getDesignationDepartment();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            this.props.submitForm(e,this.props.token);
        }
    }
    onChange=(e)=> {
      this.setState({
        [e.target.name]:e.target.value
      });
    }

    handleValidation = () => {
        let count=this.props.formObj.count;
        let errors = {};
        let errorClass = {};
        let formIsValid = true;
        
        for(let i=1;i<=count;i++){
            //console.log(this.state['name'+i]);
            if (!this.state['name'+i]) {
                formIsValid = false;
                errors["name"+i] = "Name is required";
                errorClass["name"+i] = "is-danger";
            }
            if (!this.state['email'+i]) {
                formIsValid = false;
                errors["email"+i] = "Email is required";
                errorClass["email"+i] = "is-danger";
            }
            if (!this.state['contact'+i]) {
                formIsValid = false;
                errors["contact"+i] = "Contact is required";
                errorClass["contact"+i] = "is-danger";
            }
            if (!this.state['designation'+i]) {
                formIsValid = false;
                errors["designation"+i] = "Designation is required";
                errorClass["designation"+i] = "is-danger";
            }
            if (!this.state['department'+i]) {
                formIsValid = false;
                errors["department"+i] = "Department is required";
                errorClass["department"+i] = "is-danger";
            }
              if (!this.state['gender'+i]) {
                formIsValid = false;
                errors["gender"+i] = "Gender is required";
                errorClass["gender"+i] = "is-danger";
            }
           
        }
        this.setState({
            errors: errors
        });
        this.setState({
            errorClass: errorClass
        });
        return formIsValid;
    }

 MemberForm=(dept,desg)=>{  
    let buffer=[];
  for (let j = 1; j <= this.props.formObj.count; j++) {
   
    buffer.push((<div className="card" key={j}>
    <header className="card-header">
    <p className="card-header-title">Member Detail-{j}</p>
    </header>
    <div className="card-content">
    <div className="field">
    <label className="label">Name</label>
    <div className="control">
    <input name={"name"+j} className={"input "+ (this.state.errorClass["name"+j])} onBlur={this.onChange} type="text" placeholder="Name"/>
    </div>
    <p className="help is-danger">{this.state.errors['name'+j]}</p>
    </div>
     <div className="field">
    <label className="label">Email</label>
    <div className="control">
    <input name={"email"+j} className={"input "+ (this.state.errorClass["email"+j])} onBlur={this.onChange} type="email" placeholder="Email"/>
    </div>
    <p className="help is-danger">{this.state.errors['email'+j]}</p>
    </div>
     <div className="field">
    <label className="label">Contact</label>
    <div className="control">
    <input name={"contact"+j} className={"input "+ (this.state.errorClass["contact"+j])} onBlur={this.onChange} type="tel" placeholder="Contact"/>
    </div>
    <p className="help is-danger">{this.state.errors['contact'+j]}</p>
    </div>
    <div className="field">
     <label className="label">Select Gender</label>
        <div className="control">
            <div className={"select " + (this.state.errorClass["gender" + j])}>
                <select name={"gender" + j} onChange={this.onChange}><option value='' hidden>Select Gender</option>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                </select>
            </div>
        </div>
        <p className="help is-danger">{this.state.errors['gender'+j]}</p>
    </div>
     <div className="field">
          <label className="label">Select Designation</label>
          <div className="control">
               <div className={"select "+ (this.state.errorClass["designation"+j])}>
                 <select name={"designation"+j} onChange={this.onChange}><option value='' hidden>Select Designation</option>
                {desg}
              </select>
            </div>
          </div>
          <p className="help is-danger">{this.state.errors['designation'+j]}</p>
    </div>
    <div className="field">
          <label className="label">Select Department</label>
          <div className="control">
               <div className={"select "+ (this.state.errorClass["department"+j])}>
                 <select name={"department"+j} onChange={this.onChange}><option value='' hidden>Select Department</option>
              {dept}
              </select>
            </div>
          </div>
          <p className="help is-danger">{this.state.errors['department'+j]}</p>
    </div> 
    </div > </div> ));
   
  }
   return buffer;
}

     render(){
        if(this.props.List.department!==undefined && this.props.List.designation!==undefined ){
           let dept= this.props.List.department.map(data=>(
           <option key={data.id} value = {data.name} > {data.name} </option>
            ));

        let desg=this.props.List.designation.map(data=>(
            <option key={data.id} value={data.name}>{data.name}</option>
        ));
         var html = this.MemberForm(dept,desg);
        }
       if (this.props.formSuccess.length === 0) {
        return (<div className="container has-text-center">
            <div className="card">
            <header className="card-header">
            <p className="card-header-title">Fill Below Details</p>
            </header>
            <form onSubmit={this.handleSubmit}>
            <div className="card-content">
                <div className="columns">{html}</div>
                <div className="columns field">
                <input type="hidden" name="state" value={this.props.formObj.state}/>
                <input type="hidden" name="college" value={this.props.formObj.college}/>
                <input type="hidden" name="venue" value={this.props.formObj.venue}/>
                <input type="hidden" name="loi" value={this.props.formObj.loi!==undefined?(this.props.formObj.loi):0}/>
                <input type="hidden" name="count" value={this.props.formObj.count}/>
                <button className="button is-success" type="submit">Submit</button>
                </div>
            </div>
            </form>
            </div>
        </div>)
       }
       else {
           return (<div className="container has-text-center">
           <article className= "message is-success">
                <div className="message-header">
                    <p>Success</p>
                   
                </div>
                <div className="message-body">
                    {this.props.formSuccess.message}
                </div>
            </article>
           </div>
           )
       }
    }
}


CollegeMember.propTypes = {
    formObj: PropTypes.object.isRequired,
    getDesignationDepartment: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    formObj: state.apiData.formObj,
    token:state.apiData.token,
    List:state.memData.List,
    formSuccess:state.memData.Saved
});
export default connect(mapStateToProps, {
    getDesignationDepartment, submitForm
})(CollegeMember);