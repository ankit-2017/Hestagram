import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import user from './images/user.png';
import './home.css';
import Header from './Header';
import {Col, Grid, Row, Dropdown, MenuItem} from 'react-bootstrap';
import LocalStorage from "localstorage";
import axios from 'axios';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import ip from './env'

class User extends Component{
    constructor(props){
        super(props);
        this.state={
            userData2:'',
            following:'',
            image:[],
            gallery:[],
            visible: false,
            follower:'',
            visibleProfile:false

        }
    }



    componentWillMount(){

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData2:abc[1]});

        if(!abc[1]){
            window.location.href='/';
            return false
        }


    }
    componentDidMount(){


            const self = this;
            axios.get(`${ip}/api/ShowUserImage/` + self.state.userData2.data2._id)
                .then(function (response) {
                    console.log("file response", response);
                    self.setState({image:response.data.data, gallery:response.data.data})
                })
                .catch(error=>{
                    console.log(error);
                });

            axios.post(`${ip}/api/getFollowing`, {
                userid: self.state.userData2.data2._id
            })
                .then(function (response) {
                    console.log(response);
                    self.setState({following: response.data.number})
                })
                .catch(error => {
                    console.log(error);
                })

        axios.post(`${ip}/api/follower`, {
            userid: self.state.userData2.data2._id
        })
            .then(function (response) {
                console.log(response);
                self.setState({follower: response.data.data})
            })
            .catch(error => {
                console.log(error);
            })
    }


    logout=()=>{
        let foo = new LocalStorage('UserData');
        foo.del('UserData');
        this.props.history.push('/');
    };
    open=(activeIndex, number)=> {
        this.setState({activeIndex: activeIndex || 0, visible: true});
    };

    render(){
        const image5=[];
        this.state.image.map((item, i)=>{
            item.images.map((item2, i2)=>{
                image5.push({src:`${ip}/upload/assets/`+item2, alt:'hestagram'});
            })
        });
        const style={
            textDecoration:"none"
        }


        return(


            <Col>
                <Header />
                <section id="user_detail">
                    <Grid>
                        <Row>
                            <Col md={4} sm={4}>
                                <div id="userProfileDiv">
                                    {this.state.userData2.data2.profile_img === "" ?
                                        <img src={user}
                                             id="user_profile"
                                             className="img-circle"
                                             alt="Profile pic"/>
                                        :
                                        <span>
                                            <img src={`${ip}/upload/assets/profile/`+this.state.userData2.data2.profile_img}
                                                 id="user_profile"
                                                 className="img-circle"
                                                 alt="profile"
                                                 onClick={() => {
                                                     this.setState({visibleProfile: !this.state.visibleProfile});
                                                 }}
                                            />
                                        </span>
                                    }
                                </div>
                            </Col>



                            <Col md={8} sm={8}>
                                <div id="user_detail1">
                                    <h3>{this.state.userData2?this.state.userData2.data2.username:this.props.history.push('/')}</h3>
                                    <Link to="/Edit-profile" id="edit" >Edit Profile</Link>

                                    <Dropdown id="drop" >
                                        <Dropdown.Toggle noCaret>
                                        <span className="fa fa-gear" id="gear" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <MenuItem onClick={this.logout} >Logout</MenuItem>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                                <div id="detail">
                                    <ul>
                                        <li><span>{this.state.image.length} Posts</span></li>
                                        <li><span>
                                                <Link style={style} to="/Follower">{this.state.follower} Followers</Link>
                                            </span>
                                        </li>
                                        <li>
                                            <span>
                                                <Link style={style} to="/Following">{this.state.following} Following</Link>
                                            </span>
                                        </li>
                                    </ul>
                                    <p>{this.state.userData2?this.state.userData2.data2.fullname:this.props.history.push('/')}</p>
                                </div>
                            </Col>
                        </Row>

                    <Col className="user-post">
                        <h3> User posts </h3>
                            <Row>
                            {this.state.image.map((item, i)=>{
                               return <span key={i}>
                                       {item.images.map((image,i)=>{
                                           return <Col md={3} key={i}>
                                       <span>
                                       <img src={`${ip}/upload/assets/` + image}
                                            onClick={() => {
                                                this.setState({visible: !this.state.visible});
                                            }}
                                            id="userImg"
                                            className="img-rounded"
                                            alt="Users posts"
                                       />
                                           <Viewer
                                               visible={this.state.visible}
                                               onClose={() => { this.setState({visible: false }); } }
                                               images={image5}
                                           />
                                       </span>

                                           </Col>

                                       })}


                               </span>
                            })}
                            </Row>
                    </Col>
                    </Grid>
                </section>
            </Col>


        );
    }
}
export default User