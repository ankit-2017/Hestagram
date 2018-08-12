import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import gmail from './images/gmail.png';
import './App.css';
import axios from 'axios';
import LocalStorage from 'localstorage';
import ip from './env'
import async from 'async'

import {Button, Col, Grid, Row, Panel, Form, FormControl, FormGroup, Alert, Image} from 'react-bootstrap';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            token3:'',
            email1:'',
            email2:'',
            name:'',
            city:'',
            id:'',
            verified:false,
            login_success:false,
            loginFail:false,
            homePage:'',
            suggestion:'',
            loginData:''
        };


    }

    componentWillMount(){
        let token3 = this.props.match.params.token;
        this.setState({token3:token3});

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        !abc[1]? this.props.history.push('/'): this.props.history.push('/home');
        this.setState({loginData: abc[1]});


    }

    componentDidMount(){

        const self=this;
        if(self.state.token3!=="") {

            axios.post(`${ip}/api/auth`, {
                token: this.state.token3,
            })
                .then(function (response) {
                    console.log(response);
                    console.log(response.data);
                    if (response.data === "") {
                        self.setState({verified: true})
                    }


                })
                .catch(error=>{
                    console.log('not verified')
                })
        }



            // this.state.loginData!==""?
            //     axios.post(`${ip}/api/autoLogin`,{
            //         token:self.state.loginData.tokenData.verification_token
            //     })
            //         .then(response=>{
            //             console.log('auto login data',response)
            //             if(response.data.data.verification_token===self.state.loginData.tokenData.verification_token){
            //                 this.props.history.push('/Home')
            //             }
            //             else {
            //                 this.props.history.push('/')
            //             }
            //
            //         })
            // :null


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
        const self = this;
        axios.post(`${ip}/api/Login`,{
            username:this.state.username,
            password:this.state.password
        })
            .then(function (response) {
                console.log(response);

                if(response.data.data===true && response.data.verify===true){

                    const UserData= new LocalStorage("UserData");
                    const token= new LocalStorage("token");
                    UserData.put("UserData",response.data);
                    token.put("token", response.data.tokenData.verification_token);

                    self.setState({login_success:true,
                        email2:response.data.email,
                        name:response.data.name,
                        city:response.data.city,
                        id:response.data.id

                    });
                    if(response.data.data2.city!=="" || response.data.data2.school!=="" || response.data.data2.college!=="" || response.data.data2.Hobbies!=="" || response.data.data2.profession!=="" ){
                        self.props.history.push('/Home')
                    }
                    else {
                        self.props.history.push('/suggestion')
                    }

                    const foo = new LocalStorage('UserData');
                    const abc = foo.get('UserData');
                    if(abc[1]) {

                        const token = abc[1].tokenData.verification_token
                        setAuthToken(token);
                    }

                    function setAuthToken(token) {
                        axios.defaults.headers.common['Token'] = '';
                        delete axios.defaults.headers.common['Token'];

                        if (token) {
                            axios.defaults.headers.common['Token'] = `${token}`;
                        }
                    }

                }
                else
                {
                    self.setState({loginFail:true});
                }
            })

            .catch(function (error) {
                console.log(error);
            });
    };

    render(){

        // console.log('login check',this.state.loginData);
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

                                    {this.state.loginFail?<Alert bsStyle="danger">
                                        invalid user!!
                                    </Alert>:null}
                                    <h2 id="appname">Hestagram</h2>
                                    <section id="loginForm">

                                        <Form onSubmit={this.Login1}>
                                            <FormGroup>
                                                <FormControl type="text" required onChange={this.username1} placeholder="Enter Email or Username "/>
                                            </FormGroup>

                                            <FormGroup>
                                                <FormControl type="password" required onChange={this.Password1} placeholder="Enter password"/>
                                            </FormGroup>

                                            <FormGroup>
                                                <Button id="login-btn" type="submit"  bsStyle="success" block>Login</Button>
                                            </FormGroup>

                                        </Form>

                                    </section>

                                    <FormGroup>
                                        <FormGroup id="forgot">
                                            <Link  to="/forgot">Forgot password</Link>
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