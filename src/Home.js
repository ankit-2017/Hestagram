import React, { Component } from 'react';

import {Col, Grid, Row, Panel} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import noImage from './images/noimage.gif';

import LocalStorage from 'localstorage';
import user from './user.png';
import './home.css';
import Header from './Header';
import UserSuggestion2 from './UserSuggestion2';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import Example from './image_load';
import axios from 'axios';
import Timestamp from 'react-timestamp';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import ip from './env'


class Home extends Component {
    constructor(props){
        super(props);

        this.handleShow = this.handleShow.bind(this);


        this.state = {
            show: false,
            userData:'',
            image:[],
            fileResponse:[],
            NoImg:'',
            hideImg:false,
            showImage:true,
            showContent:'',
            visible: false,
            gallery:[],
            hashtagRes:''

        };
    }
    componentWillMount() {

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});
    }
    componentDidMount(){
        const self = this;
        axios.get(`${ip}/api/ShowImage/` + self.state.userData.data2._id)
            .then(function (response) {
                console.log("file response", response);
                self.setState({image:response.data.data});
                if(self.state.image.length===0){
                    self.setState({NoImg:true})
                }

            })
            .catch(error=>{
                console.log(error);
            })

    }
    handleShow() {
        this.setState({ show: true });
    }
    ShowAll=(i)=>{
        this.setState({showImage:false, showContent:i});
    };

    render(){
        const image5=[];
        this.state.image.map((item, i)=>{
            {item.postData.images.map((item2, i)=>{
                image5.push({src:`${ip}/upload/assets/`+item2 });
            })}

        });

            return (
                <Panel bsStyle="default" >
                    <Header {...this.props} />
                    <section id="home-post">
                        <Grid>
                            <Row>
                                <Col md={8}>
                                    {this.state.NoImg?
                                        <div>
                                        <Panel bsStyle="default">
                                            <div id="blankPost">
                                                <img src={noImage} alt="blank post" />
                                            </div>
                                        </Panel>
                                        <UserSuggestion2 />
                                        </div>
                                                :
                                        this.state.image.map((item, i)=> {
                                       return <Panel bsStyle="default" key={i} >
                                            <div id="username">
                                                {item.secondData.profile_img === "" ?
                                                    <img className="img-circle" src={user} alt="Profile pic"/>
                                                    :
                                                    <img src={`${ip}/upload/assets/profile/`+item.secondData.profile_img}
                                                         className="img-circle"
                                                         alt="profile"
                                                    />
                                                }
                                                <span>
                                                    <Link style={{textDecoration:'none'}}
                                                          to={"/userData/"+item.secondData._id}>{item.secondData.fullname}</Link>
                                                </span>
                                                <p id="location">{item.postData.location}</p>
                                            </div>



                                            <div id="postImage">
                                                <ul>
                                                    {item.postData.images.length === 1 ?
                                                            <li id="singleImage">
                                                                <img key={i}
                                                                     src={`${ip}/upload/assets/`+item.postData.images[0] }
                                                                     alt="user posts"
                                                                     onClick={() => {
                                                                         this.setState({visible: !this.state.visible});
                                                                     }}
                                                                />

                                                                <Viewer
                                                                    visible={this.state.visible}
                                                                    onClose={() => { this.setState({visible: false }); } }
                                                                    images={image5}
                                                                />
                                                            </li>
                                                            :
                                                        item.postData.images.map((img,i=1)=>{

                                                        return <li id="customStyle" key={i}>
                                                                    <img key={i}
                                                                         src={`${ip}/upload/assets/`+img }
                                                                         alt="user posts"
                                                                         onClick={() => {
                                                                             this.setState({visible: !this.state.visible});
                                                                         }}
                                                                    />

                                                                    <Viewer
                                                                        visible={this.state.visible}
                                                                        onClose={() => { this.setState({visible: false }); } }
                                                                        images={image5}
                                                                    />

                                                                </li>
                                                    })}
                                                </ul>
                                            </div>
                                           <Panel.Footer>
                                               <p>{item.caption}</p>
                                               <p>
                                                   {item.postData.hashtag.map((item5,i=1)=>{
                                                       return <span id="tags" key={i}  >
                                                                    <Link style={{textDecoration:'none'}} to={"/userData/"+item.secondData._id}>{'#'+item.postData.hashtag[i]}</Link>
                                                           </span>
                                                   })}
                                               </p>
                                               <p id="time"><Timestamp time={item.postData.post_time} precision={2} /></p>
                                           </Panel.Footer>

                                        </Panel>
                                    }
                                     )}
                                </Col>
                                <Col md={4} id="custom-float">
                                    <div className="user-feed">
                                        <div id="username">
                                            {this.state.userData.data2.profile_img === "" ?
                                                <img className="img-circle" src={user} id="user-pic" alt="Profile pic"/>
                                                :
                                                <img src={`${ip}/upload/assets/profile/`+this.state.userData.data2.profile_img}
                                                     className="img-circle"
                                                     id="user-pic"
                                                     alt="profile"
                                                />
                                            }
                                            <span>{this.state.userData.data2.username}</span>
                                            <p>{this.state.userData.data2.fullname}</p>
                                        </div>
                                         <Example {...this.props} />
                                    </div>
                                </Col>
                            </Row>
                        </Grid>
                    </section>
                </Panel>
            );
        }

}


export default Home