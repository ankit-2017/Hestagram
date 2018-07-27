import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import user from './user.png';
import './home.css';
import Header from './Header';
import {Col, Grid, Row, Dropdown, MenuItem} from 'react-bootstrap';
import LocalStorage from "localstorage";
import axios from 'axios';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';


class User extends Component{
    constructor(props){
        super(props);
        this.state={
            userData2:'',
            following:'',
            image:[],
            gallery:[],
            visible: false

        }
    }



    componentWillMount(){

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData2:abc[1]});
        if(!abc[1]){
            this.props.history.push('/');
        }


    }
    componentDidMount(){
        const self=this;
        if(!self.state.userData2){
            this.props.history.push('/');
        }
        else {

            const self = this;
            axios.get('http://localhost:4000/api/ShowImage/' + self.state.userData2.data2._id)
                .then(function (response) {
                    console.log("file response", response);
                    self.setState({image:response.data.data, gallery:response.data.image})
                })
                .catch(error=>{
                    console.log(error);
                });

            axios.post('http://localhost:4000/api/CountFollowing', {
                userid: self.state.userData2.data2._id
            })
                .then(function (response) {
                    console.log(response);
                    self.setState({following: response.data.number})
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
    logout=()=>{
        let foo = new LocalStorage('UserData');
        // const abc = foo.get('UserData');
        foo.del('UserData');
        this.props.history.push('/');
    };
    open=(activeIndex, number)=> {
        this.setState({activeIndex: activeIndex || 0, visible: true});
    };

    render(){
        const image5=[];
        this.state.gallery.map((item, i)=>{
            image5.push({src:item.image1, alt:'hestagram'});
            image5.push({src:item.image2, alt:'hestagram'});
            image5.push({src:item.image3, alt:'hestagram'});
            image5.push({src:item.image4, alt:'hestagram'});
        });


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
                                        <img src={'http://localhost:4000/upload/assets/profile/'+this.state.userData2.data2.profile_img}
                                             id="user_profile"
                                             className="img-circle"
                                             alt="profile"
                                        />
                                    }
                                </div>
                            </Col>



                            <Col md={8} sm={8}>
                                <div id="user_detail1">
                                    <h3>{this.state.userData2?this.state.userData2.data2.username:this.props.history.push('/')}</h3>
                                    <Link to="/Edit-profile" id="edit" >Edit Profile</Link>

                                    <Dropdown >
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
                                        <li><span>11 Followers</span></li>
                                        <li><span>{this.state.userData2?this.state.following:this.props.history.push('/')} Following</span></li>
                                    </ul>
                                    <p>{this.state.userData2?this.state.userData2.data2.fullname:this.props.history.push('/')}</p>
                                </div>
                            </Col>
                        </Row>

                    <Col className="user-post">
                        <h3> User posts </h3>
                            <Row>
                            {this.state.image.map((item, i)=>{
                               return <span>
                                <Col md={3}>
                                   {item.image1 !== undefined ?
                                       <span>
                                       <img src={'http://localhost:4000/upload/assets/' + item.image1}
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
                                   <h5>{item.caption}</h5>
                                       </span>
                                           : null
                                   }

                               </Col>
                                <Col md={3} >

                                   {item.image2 !== undefined ?
                                       <span>
                                           <img src={'http://localhost:4000/upload/assets/' + item.image2}
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
                                                <h5>{item.caption}</h5>
                                       </span>
                                           : null
                                   }

                                </Col>
                                   <Col md={3} >
                                   {item.image3 !== undefined ?
                                       <span>
                                           <img src={'http://localhost:4000/upload/assets/' + item.image3}
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
                                           <h5>{item.caption}</h5>
                                       </span>
                                       : null
                                   }

                                   </Col>

                                   <Col md={3} >
                                   {item.image4 !== undefined ?
                                       <span>
                                           <img src={'http://localhost:4000/upload/assets/' + item.image4}
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
                                           <h5>{item.caption}</h5>
                                       </span>
                                       : null
                                   }

                                   </Col>

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