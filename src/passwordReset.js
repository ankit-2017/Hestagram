import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ip from './env'

import {Button, Col,ControlLabel, Form, FormControl, FormGroup, Alert} from 'react-bootstrap';

class PasswordReset extends Component{
    constructor(props){
        super(props);
        this.state={
            oldPassword:'',
            newPassword:'',
            confirm_password:'',
            wrong:false,
            userEmail:'',
            setPassword:false,
            wrongOld:false
        }
    }

    componentWillMount(){
        const user_email = this.props.match.params.user_email;
        this.setState({userEmail:user_email})
    }

    handleNew=(event)=>{

        let New = event.target.value;
        this.setState({newPassword:New})
    };

    handleConfirmPassword=(event)=>
    {

        let ConNew = event.target.value;
        this.setState({confirm_password:ConNew})
    };
    handleReset=(event)=>{
      event.preventDefault();
      const pass = this.state.newPassword;
      const con = this.state.confirm_password;
      const userEmail = this.state.userEmail;
      console.log(userEmail);
      if(pass!==con){
          this.setState({wrong:true, setPassword:false});
          return false
            }
      else {
          this.setState({wrong:false});
          console.log('executing else part for axios');
          const self = this;
          axios.post(`${ip}/api/PasswordReset`,{
              oldpass: self.state.oldPassword,
              newpas:self.state.newPassword,
              userEmail:self.state.userEmail

          })
          .then(function (response) {
            console.log(response);
            if(response.data.data.Email === self.state.userEmail){
                self.setState({setPassword:true, wrongOld:false});
            }
            else{
                self.setState({wrongOld:true, setPassword:false })
            }
          })
      }
    };


    render(){
        return(
            <div>
                <Col md={4} mdOffset={3} >
                    <h4>Change password here</h4>
                    {this.state.wrong?<Alert bsStyle="danger" >
                        Password and confirm password not matched
                    </Alert>: null }

                    {this.state.setPassword?<Alert bsStyle="success" >
                        Password changed successfully!
                    </Alert>: null }

                    {this.state.wrongOld?<Alert bsStyle="danger" >
                        Password not changed
                    </Alert>: null }

                    <Form onSubmit={this.handleReset} >

                        <FormGroup>
                            <ControlLabel>New password</ControlLabel>
                            <FormControl type="password" name="NewPassword" placeholder="Password" onChange={this.handleNew}  />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Confirm password</ControlLabel>
                            <FormControl type="password" name="Cpassword" placeholder="Confirm Password" onChange={this.handleConfirmPassword}  />
                        </FormGroup>

                        <FormGroup>
                            <Button type="submit" name="submit" >Change Password</Button>
                            {this.state.setPassword?
                            <Link style={{marginLeft:"10px" }} to="/" bsStyle="primary" >Login</Link>
                                : null}
                        </FormGroup>

                    </Form>
                </Col>
            </div>
        );
    }
}

export default PasswordReset
