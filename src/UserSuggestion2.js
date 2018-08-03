import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Grid, Row, Image, Button} from 'react-bootstrap';
import user from './images/user.png';
import axios from 'axios';
import LocalStorage from "localstorage";
import ip from './env'


class UserSuggestion2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'',
            matchData:[]
        }
    }
    componentWillMount(){

        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});


    }
    componentDidMount(){
        console.log('user city',this.state.userData.data2.city);
        const self=this;
        axios.post(`${ip}/api/userSuggestion`,{
            username:self.state.userData.data2.username,

        })
            .then(response=>{
                console.log(response);
                self.setState({matchData:response.data.data})
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
                document.location.href = '/home';

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
            padding:'20px',
            lineHeight:'12px'
        };
        return (
            <div>
                <div style={{marginTop:'30px'}}>
                    <Grid>
                        <Row>
                            <h3 style={{textAlign:'center'}} >Suggestion for you</h3>
                            {this.state.matchData.map((item,i)=>{
                                return <Col md={3} key={i}>
                                    <div id="sBox" style={style}>
                                        <Link to={'/userData/' + item._id} >
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
                                            :
                                        item.school===this.state.userData.data2.school?
                                            <p>{item.school}</p>
                                            :null
                                        }

                                        <Button bsStyle="primary" onClick={()=>this.FollowUser(item._id)} block >Follow</Button>

                                    </div>
                                </Col>
                            })}


                        </Row>
                    </Grid>
                </div>
            </div>
        )

    }
}
export default UserSuggestion2