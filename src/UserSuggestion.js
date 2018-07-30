import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Grid, Row, Image, Button} from 'react-bootstrap';
import user from './user.png';
import Header from './Header';
import axios from 'axios';
import './home.css';
import LocalStorage from "localstorage";
import ip from './env'

class UserSuggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'',
            matchData:[],
            followStatus:true,
            follow:false,
            FollowData:[],
            noSuggestion:false
        }
    }
    componentWillMount(){

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});


    }
    componentDidMount(){
        const self=this;
        axios.post(`${ip}/api/userSuggestion`,{
            username:self.state.userData.data2.username,

        })
            .then(response=>{
                console.log(response);
                self.setState({matchData:response.data.data})
                // const box=[];
                // response.data.data.map((item,i)=>{
                //     if(item.finalData.length===1){
                //         box.push(item.finalData);
                //     }
                // })
                // console.log(box.length)
                if(response.data.data.length===0){
                    self.setState({noSuggestion:true})

                }
            })
            .catch(error=>{
                console.log(error);
            })
    }

    FollowUser=(id)=>{
        const self=this;
        axios.post(`${ip}/api/follow`,{
            userid:self.state.userData.data2._id,
            fid:id
        })
            .then(function (response) {
                document.location.href = '/UserSuggestion';

            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        const style={
            textAlign:'center',
            border:'1px solid #eaecef',
            borderRadius:'3px',
            padding:'20px'
        };
        return (
            <div>
                <Header {...this.props}/>
                <div style={{marginTop:'30px'}}>
                <Grid>
                    <Row>
                        {this.state.noSuggestion?
                            <Col md={12}>
                                <div id="suggestionDiv" >
                                    <p>No suggestion yet</p>
                                </div>
                            </Col>
                            :

                        this.state.matchData.map((item,i)=>{
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
                                        {item.college===this.state.userData.data2.college?
                                                <p>{item.college}</p>
                                            :null
                                        }
                                        {item.city===this.state.userData.data2.city?
                                            <p>{item.city}</p>
                                            :null
                                        }
                                         {/*onClick={()=>this.FollowUser(item._id)}*/}
                                         <Link style={{textDecoration:'none'}} to={'/userData/'+item._id}>
                                                <Button bsStyle="primary"  block>Follow </Button>
                                         </Link>

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
export default UserSuggestion
