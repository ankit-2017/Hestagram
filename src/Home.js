import React, { Component } from 'react';

import {Col, Grid, Row, Panel} from 'react-bootstrap';

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
            gallery:[]

        };
    }
    componentWillMount() {

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});
    }
    componentDidMount(){
        const self = this;
        axios.get('http://localhost:4000/api/ShowImage/' + self.state.userData.data2._id)
            .then(function (response) {
                console.log("file response", response);
                self.setState({image:response.data.data, gallery:response.data.image});
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
        this.state.gallery.map((item, i)=>{
            image5.push({src:item.image1, alt:'hestagram'});
            image5.push({src:item.image2, alt:'hestagram'});
            image5.push({src:item.image3, alt:'hestagram'});
            image5.push({src:item.image4, alt:'hestagram'});
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
                                            <div id="postImage">
                                                <img src={noImage} alt="blank post" />
                                            </div>
                                        </Panel>
                                        <UserSuggestion2 />
                                        </div>
                                                :
                                        this.state.image.map((item, i)=> {
                                       return <Panel bsStyle="default">
                                            <div id="username">
                                                {this.state.userData.data2.profile_img === "" ?
                                                    <img className="img-circle" src={user} alt="Profile pic"/>
                                                    :
                                                    <img src={'http://localhost:4000/upload/assets/profile/'+this.state.userData.data2.profile_img}
                                                         className="img-circle"
                                                         alt="profile"
                                                    />
                                                }
                                                <span>{this.state.userData.data2.fullname}</span>
                                                <p id="location">{item.location}</p>
                                            </div>
                                            <div id="postImage">
                                                <ul>
                                                    {item.image2 === undefined && item.image3 === undefined && item.image4 === undefined ?
                                                        <li id="customStyle">
                                                            <img key={i} onClick={() => { this.setState({ visible: !this.state.visible }); } }
                                                                 src={'http://localhost:4000/upload/assets/' + item.image1}
                                                                 alt="user posts"
                                                            />

                                                            <Viewer
                                                                visible={this.state.visible}
                                                                onClose={() => { this.setState({visible: false }); } }
                                                                images={image5}
                                                            />

                                                        </li> :
                                                        <li id='image1' >
                                                            <img key={i} onClick={() => { this.setState({ visible: !this.state.visible }); } }
                                                                 src={'http://localhost:4000/upload/assets/' + item.image1}
                                                                 alt="user's post"
                                                            />

                                                            <Viewer
                                                                visible={this.state.visible}
                                                                onClose={() => { this.setState({visible: false }); } }
                                                                images={image5}
                                                            />

                                                        </li>
                                                    }


                                                    {item.image2!==undefined?
                                                    <li id='image2'>
                                                        {this.state.showContent===i?
                                                            <span>
                                                            <img  key={i} onClick={() => { this.setState({ visible: !this.state.visible }); } }
                                                                  src={'http://localhost:4000/upload/assets/'+item.image2}
                                                                  alt="user's post"/>
                                                            <Viewer
                                                                visible={this.state.visible}
                                                                onClose={() => { this.setState({visible: false }); } }
                                                                images={image5}
                                                            />

                                                            </span>
                                                            :null
                                                        }
                                                        {this.state.showContent!==i?
                                                            item.image2!==undefined?
                                                            <span  id="style1" onClick={()=>this.ShowAll(i)} >
                                                                <span id="fadeImage2" >
                                                                    <img key={i}  src={'http://localhost:4000/upload/assets/'+item.image2}  alt="user's post"/>
                                                                </span>
                                                                <span id="styleFortext" >View More</span>
                                                            </span>
                                                                :null
                                                                : null
                                                        }

                                                    </li>
                                                        :null}
                                                </ul>
                                                {this.state.showContent === i ?
                                                    <ul>
                                                        {item.image3 !== undefined ?
                                                            <li>
                                                                <img key={i} onClick={() => { this.setState({ visible: !this.state.visible }); } }
                                                                     src={'http://localhost:4000/upload/assets/' + item.image3}
                                                                     alt="user's post"
                                                                />
                                                                <Viewer
                                                                    visible={this.state.visible}
                                                                    onClose={() => { this.setState({visible: false }); } }
                                                                    images={image5}
                                                                />


                                                            </li> : null
                                                        }
                                                        {item.image4 !== undefined ?
                                                            <li>
                                                                <img key={i} onClick={() => { this.setState({ visible: !this.state.visible }); } }
                                                                     src={'http://localhost:4000/upload/assets/' + item.image4}
                                                                     alt="user's post"
                                                                />

                                                                <Viewer
                                                                    visible={this.state.visible}
                                                                    onClose={() => { this.setState({visible: false }); } }
                                                                    images={image5}
                                                                />

                                                            </li> : null
                                                        }
                                                    </ul> : null
                                                }


                                            </div>
                                           <Panel.Footer>
                                               <p>{item.caption}</p>
                                               <p id="time"><Timestamp time={item.post_time} precision={2} /></p>
                                           </Panel.Footer>

                                        </Panel>
                                    })}
                                </Col>
                                <Col md={4} id="custom-float">
                                    <div className="user-feed">
                                        <div id="username">
                                            {this.state.userData.data2.profile_img === "" ?
                                                <img className="img-circle" src={user} id="user-pic" alt="Profile pic"/>
                                                :
                                                <img src={'http://localhost:4000/upload/assets/profile/'+this.state.userData.data2.profile_img}
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