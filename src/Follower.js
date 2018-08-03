import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'
import user from './images/user.png';

import axios from 'axios';
import './home.css';
import LocalStorage from 'localstorage';
import ip from './env'
import {Button, Col, Grid, Row, Image} from 'react-bootstrap';


class Follower extends Component{
    constructor(props){
        super(props)
        this.state={
            follow:false,
            follower:[],
            userData:'',
            followButton:true
        }
    }
    componentWillMount(){
        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});
    }
    componentDidMount(){
        const self = this;
        axios.post(`${ip}/api/follower`, {
            userid: self.state.userData.data2._id
        })
            .then(function (response) {
                console.log(response);
                self.setState({follower: response.data.FollowerData})
            })
            .catch(error => {
                console.log(error);
            })
    }
    FollowUser = (id)=>{
        const self=this;
        axios.post(`${ip}/api/follow`,{
            userid:self.state.userData.data2._id,
            fid:id
        })
            .then(function (response) {
                console.log(response);
                window.location.href='/Follower'

            })
            .catch(function (error) {
                console.log(error)
            })
    };

    // UnFollowUser = (id)=>{
    //     const self=this;
    //     axios.post(`${ip}/api/UnFollow`,{
    //         userid:self.state.userData.data2._id,
    //         fid:id
    //     })
    //         .then(function (response) {
    //             console.log(response);
    //             self.setState({followButton:false})
    //
    //         })
    //         .catch(function (error) {
    //             console.log(error)
    //         })
    // };

    render(){
        const style={
            textAlign:'center',
            border:'1px solid #eaecef',
            borderRadius:'3px',
            padding:'20px'
        };
        const style1={
            textDecoration:'none'
        }
        return(
            <div>
                <Header {...this.props}/>
                <div style={{marginTop:'30px'}}>
                    <Grid>
                        <Row>
                            {this.state.follower.length===0?
                                <Col md={12}>
                                    <div id="suggestionDiv">
                                        <p>You have no follower yet</p>
                                    </div>
                                </Col>
                                :

                                this.state.follower.map((item,i)=>{
                                    return <span key={i}>
                                <Col md={3} >
                                    <div id="sBox" style={style}>
                                        <Link to={'/userData/' + item._id}>
                                            {item.profile_img !== "" ?
                                                <Image
                                                    src={`${ip}/upload/assets/profile/` + item.profile_img}
                                                    alt="profile"
                                                    id="suggestionProfile"
                                                    circle
                                                /> :
                                                <Image src={user} circle id="suggestionProfile"/>
                                            }
                                        </Link>
                                        <p><strong>{item.fullname}</strong></p>
                                        <p>{item.college}</p>
                                        <p>
                                            <Link style={style1} to={'/userData/'+item._id}>
                                                <Button bsStyle="primary"
                                                        block>View Profile </Button>
                                            </Link>
                                        </p>

                                            {/*<Button bsStyle="info" onClick={() => this.UnFollowUser(item._id)}*/}
                                                    {/*block>Unfollow </Button>*/}



                                    </div>
                                </Col>

                            </span>
                                })}


                        </Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Follower