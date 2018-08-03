import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import gmail from './images/gmail.png';
import './App.css';
import ip from './env'
import axios from 'axios';
import {Button, Alert, Col, Grid, Row, Panel, Form, FormControl, FormGroup, Image} from 'react-bootstrap';


class SignUp extends Component{
    constructor(props){
        super(props);
        this.state={

            email:'',
            fullname:'',
            username:'',
            password:'',
            emailValidation:false,
            registration: false,
            incomplete:false,
            validEMail:false,
            invalidUser:false,
            UserOk:false,
            EmailOk:false,
            weakpas:false,
            strong:false,
            full:false,
            notfull:false

        };
        this.formSubmit = this.formSubmit.bind(this);

    }


    Email =(event)=>{
        const emailVal = document.getElementById('email3').value;
        const emailRejex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if(emailVal.search(emailRejex)== -1 || emailVal==="")
        {
            this.setState({validEMail:true, EmailOk:false});
            return false
        }
        this.setState({email:emailVal, validEMail:false, EmailOk:true});

    };

    fullname =(event)=>{
        let fullname = event.target.value;
        const full =/^[a-zA-Z ]*$/;
        if(fullname.search(full) == -1){
            this.setState({full:false, notfull:true});
            return false
        }
        this.setState({fullname:fullname, full:true, notfull:false});


    };

    Username =(event)=>{
        const regexp = /^\S*$/;
        let username = event.target.value;
        if(username.search(regexp)==-1 || username==="" ){
            this.setState({invalidUser:true, UserOk:false});
            return false
        }
        this.setState({username:username, invalidUser:false, UserOk:true });
    };

    Password =(event)=>{
        let password = event.target.value;
        this.setState({password:password});

    };
    formSubmit(e){
        e.preventDefault();
        const emailVal = document.getElementById('email3').value;
        const password = this.state.password
        const emailRejex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        const passwordLength=6;
        // const pas =/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;
        if(emailVal.search(emailRejex)== -1){
            this.setState({validEMail:true});
            return false
        }
        if(password.length< passwordLength){
            this.setState({weakpas:true, strong:false});
            return false
        }
        const self = this;
        axios.post(`${ip}/api/Signup`, {
            email: this.state.email,
            fullname: this.state.fullname,
            username: this.state.username,
            password: this.state.password
        })
            .then(function (response) {
                console.log(response);
                console.log(response.data.data.username);

                if((response.data.status === true) && (response.data.error === false)) {
                        self.setState({registration:true, incomplete:false});

                }
                else{
                    self.setState({incomplete:true, registration:false})
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        document.getElementById('signUpForm').reset();
        self.setState({EmailOk:false,full:false, UserOk:false })

    };
    render(){
        return(
            <section id="main">
                <Grid>
                    <Row>
                        <Col md={6}>
                            <div id="main-side">
                                <h2>Welcome to Hestagram</h2>
                                <h4>A photo sharing Application</h4>
                                <Image id="main-img" src={gmail} alt="sidebar image" />
                            </div>
                        </Col>
                        <Col md={6}>
                            <Col md={8}>

                                <Panel bsStyle="default">
                                    <Panel.Body>
                                        {this.state.registration?<Alert bsStyle="success" >
                                            A verification mail is send on {this.state.email} , Click on link to activate account
                                        </Alert>:null}

                                        {this.state.incomplete?<Alert bsStyle="danger" >
                                            User already registered
                                        </Alert>:null}

                                        <h2 id="appname">Hestagram</h2>
                                        <h4 id="text1">
                                            Sign up to see photos and videos from your friends
                                        </h4>
                                        <section id="form">
                                            <Form onSubmit={this.formSubmit} id="signUpForm" autoComplete="off" >
                                                <FormGroup>

                                                    <FormControl type="text" id="email3" required onChange={this.Email}  placeholder="Enter Email"/>
                                                    {this.state.validEMail?<p id="invalidEmail">Invalid Email</p>: null }
                                                    {this.state.EmailOk?<p id="EmailOk"><strong>OK</strong></p>: null }
                                                </FormGroup>

                                                <FormGroup>

                                                    <FormControl type="text" required onChange={this.fullname}  id="fullname" placeholder="Enter full name" />
                                                    {this.state.notfull?<p id="invalidEmail" >Name should contain only alphabets</p>:null}
                                                    {this.state.full?<p id="ok" >ok</p>:null}
                                                </FormGroup>

                                                <FormGroup>

                                                    <FormControl type="text" required onChange={this.Username} placeholder="Enter Username"/>
                                                    {this.state.invalidUser?<p id="invalidEmail">Username should not contain space or null</p>: null }
                                                    {this.state.UserOk?<p id="ok"><strong>OK</strong></p>: null }
                                                </FormGroup>

                                                <FormGroup>
                                                    <FormControl type="password" required onChange={this.Password} placeholder="Enter password"/>
                                                    {this.state.weakpas?<p id="invalidEmail" >password must be 6 character long</p>:null}
                                                    {/*{this.state.strong?<p id="ok" >Ok</p>:null}*/}
                                                </FormGroup>

                                                <FormGroup>
                                                    <Button type="submit"  id="signup" block>
                                                        Sign Up
                                                    </Button>

                                                </FormGroup>
                                            </Form>
                                            <div className="terms">
                                                <h5>By signing up, you agree to our</h5>
                                                <h5> <strong><a href="#"> Terms & Privacy Policy</a></strong></h5>
                                            </div>
                                        </section> {/* end of form-section */}

                                    </Panel.Body> {/* end of panel-body */}
                                </Panel>
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h5 id="last-div" > Have an account <Link to="/"> Log In </Link> </h5>
                                    </div>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Grid>
            </section>
        );
    }
}
export default SignUp