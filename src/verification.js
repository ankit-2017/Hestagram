import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import gmail from './images/gmail.png';
import './App.css';
import axios from 'axios';
import ip from './env'
import {Button, Col, Grid, Row, Panel, Form, FormControl, FormGroup, Image} from 'react-bootstrap';

class Login extends Component{

    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        };


    }

    username1=(event)=>{
        let username = event.target.value;
        this.setState({username:username})
    };
    Password1=(event)=>{
        let pass1 = event.target.value;
        this.setState({password:pass1})
    };
    Login1=(event)=>{
        event.preventDefault();
        axios.post(`${ip}/api/Login`,{
            username:this.state.username,
            password:this.state.password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
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
                                <Image id="main-img" src={gmail} alt="Login image" />
                            </div>

                        </Col>
                        <Col md={6}>
                            <Col md={8}>
                                <section id="login">
                                    <Panel bsStyle="default">
                                        <Panel.Body>
                                            <h2 id="appname">Hestagram</h2>
                                            <section id="loginForm">

                                                <Form onSubmit={this.Login1}>
                                                    <FormGroup>
                                                        <FormControl type="text" onChange={this.username1} placeholder="Enter Email/Username "/>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <FormControl type="password" onChange={this.Password1} placeholder="Enter password"/>
                                                    </FormGroup>

                                                    <FormGroup>
                                                        <Button id="login-btn" type="submit"  bsStyle="success" block>Login</Button>
                                                    </FormGroup>

                                                </Form>

                                            </section>

                                            <FormGroup>
                                                <p id="orText">or</p>
                                                <Button id="facebookLogin" block>
                                            <span className="fa fa-facebook-square">

                                            </span>
                                                    Login with Facebook
                                                </Button>
                                                <FormGroup id="forgot">
                                                    <Link  to="#">Forgot password</Link>
                                                </FormGroup>
                                            </FormGroup>
                                            <Panel bsStyle="default">

                                                <p id="signup-link">Not have an account <Link  to="/SignUp" >Sign up</Link> </p>

                                            </Panel>

                                        </Panel.Body> {/* end of panel-body */}
                                    </Panel> {/* end of panel */}
                                </section>
                            </Col> {/* end of col-md-8 */}
                        </Col> {/* end of col-md-6 */}
                    </Row> {/* end of row */}
                </Grid> {/* end of container */}
            </section>
        );
    }
}
export default Login