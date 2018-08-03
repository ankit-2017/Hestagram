import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import ip from './env'
import './home.css'

import {Button,Row, Grid,Panel, Col,ControlLabel, Form, FormControl, FormGroup, Alert} from 'react-bootstrap';

class PasswordReset extends Component{
    constructor(props){
        super(props);
        this.state={
            oldPassword:'',
            newPassword:'',
            confirm_password:'',
            wrong:false,
            Token:'',
            setPassword:false,
            wrongOld:false,
            LengthError:false
        }
    }

    componentWillMount(){
        const token = this.props.match.params.token;
        this.setState({Token:token})
        console.log('token', token);
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


      if(pass!==con){
          this.setState({wrong:true, setPassword:false, LengthError:false});
          return false
      }
      else if (pass.length<=6){
          this.setState({LengthError:true, wrong:false})
      }
      else {
          this.setState({wrong:false});

          const self = this;
          axios.post(`${ip}/api/PasswordReset`,{
              newpas:self.state.newPassword,
              token:self.state.Token,

          })
          .then(function (response) {
            console.log(response);
            if(response.data.data.nModified === 1){
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

                <Grid>
                    <Row>
                        <Col md={4} mdOffset={4} >
                            <div id="PasswordPanel">
                            <Panel>
                                <Panel.Body>

                                    {this.state.wrong?<Alert bsStyle="danger" >
                                        Password and confirm password not matched
                                    </Alert>: null }

                                    {   this.state.LengthError?
                                            <Alert bsStyle="danger" >
                                                Password cannot be less than 6 character
                                            </Alert>:
                                        this.state.setPassword?<Alert bsStyle="success" >
                                            Password changed successfully!
                                        </Alert>: null
                                    }

                                    {this.state.wrongOld?<Alert bsStyle="danger" >
                                        Password not changed
                                    </Alert>: null }
                                    <h4>Change password here</h4>

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
                                            <Button type="submit" bsStyle="primary" >Change Password</Button>
                                            {this.state.setPassword?
                                                <Link style={{marginLeft:"10px" }} to="/" bsStyle="primary" >Login</Link>
                                                    : null
                                            }
                                        </FormGroup>

                                    </Form>
                                </Panel.Body>
                            </Panel>
                            </div>
                        </Col>
                    </Row>
                </Grid>

        );
    }
}

export default PasswordReset
