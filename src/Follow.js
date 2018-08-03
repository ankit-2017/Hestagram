import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'
import user from './images/user.png';

import axios from 'axios';
import './home.css';
import LocalStorage from 'localstorage';
import ip from './env'
import {Button, Col, Grid, Row, Image} from 'react-bootstrap';


class Follow extends Component{
    constructor(props){
        super(props)
        this.state={
            follow:false,
            following:[],
            userData:''
        }
    }
    componentWillMount(){
        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});
    }
    componentDidMount(){
        const self = this;
        axios.post(`${ip}/api/getFollowing`, {
            userid: self.state.userData.data2._id
        })
            .then(function (response) {
                console.log(response);
                self.setState({following: response.data.data})
            })
            .catch(error => {
                console.log(error);
            })
    }
    UnFollowUser = (id)=>{
        const self=this;
        axios.post(`${ip}/api/UnFollow`,{
            userid:self.state.userData.data2._id,
            fid:id
        })
            .then(function (response) {
                console.log(response);
                window.location.href='/Following'

            })
            .catch(function (error) {
                console.log(error)
            })
    };

    render(){
        const style={
            textAlign:'center',
            border:'1px solid #eaecef',
            borderRadius:'3px',
            padding:'20px'
        };
        return(
            <div>
                <Header {...this.props}/>
                <div style={{marginTop:'30px'}}>
                    <Grid>
                        <Row>
                            {this.state.following.length===0?
                                <Col md={12}>
                                    <div id="suggestionDiv">
                                        <p>Not following anyone</p>
                                    </div>
                                </Col>
                                :

                                this.state.following.map((item,i)=>{
                                    return <span key={i}>
                                <Col md={3} >
                                    <div id="sBox" style={style}>
                                        <Link to={'/userData/' + item.data._id}>
                                            {item.data.profile_img !== "" ?
                                                <Image
                                                    src={`${ip}/upload/assets/profile/` + item.data.profile_img}
                                                    alt="profile"
                                                    id="suggestionProfile"
                                                    circle
                                                /> :
                                                <Image src={user} circle id="suggestionProfile"/>
                                            }
                                        </Link>
                                        <p><strong>{item.data.fullname}</strong></p>
                                        <p>{item.data.college}</p>
                                        <Button bsStyle="primary" onClick={()=>this.UnFollowUser(item.follower_id)}  block>Unfollow </Button>


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

export default Follow