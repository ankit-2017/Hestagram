import React ,{Component} from 'react';
import {Link} from 'react-router-dom';
import {Col, Grid, Row, Image, Button} from 'react-bootstrap';
import user from './user.png';
import Header from './Header';
import axios from 'axios';
import './home.css';
import LocalStorage from "localstorage";

class UserSuggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'',
            matchData:[],
            followStatus:true,
            follow:false
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
        axios.post('http://localhost:4000/api/userSuggestion',{
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
    // setData=(id)=>{
    //     const self=this;
    //     axios.post('http://localhost:4000/api/CheckFollow',{
    //         userid:self.state.userData.data2._id,
    //         following_id:id
    //     })
    //         .then(function(response){
    //             console.log(response);
    //             if(response.data.data===null){
    //
    //                 self.setState({followStatus:true, follow:false})
    //             }
    //             else {
    //                 self.setState({followStatus:false, follow:true})
    //             }
    //         })
    //         .catch(error=>{
    //             console.log(error);
    //         })
    // };


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
                        {this.state.matchData.map((item,i)=>{
                            return <Col md={3}>
                                <div id="sBox" style={style}>
                                    <Link to={'/userData/' + item._id} >
                                        {item.profile_img !== "" ?
                                            <Image
                                                src={'http://localhost:4000/upload/assets/profile/' + item.profile_img}
                                                alt="profile"
                                                id="suggestionProfile"
                                                circle
                                            /> :
                                            <Image src={user} circle id="suggestionProfile" />
                                        }
                                    </Link>
                                    <p><strong>{item.fullname}</strong></p>
                                    <p>{item.college}</p>
                                    <p>{item.city}</p>
                                    <Link to={'/userData/'+ item._id}>
                                        <Button bsStyle="primary" block >View Profile </Button>
                                    </Link>
                                    {/*{this.state.followStatus?<Button onClick={()=>this.setData(item._id)} bsStyle="primary" block >Follow</Button>: null}*/}
                                    {/*{this.state.follow?<Button bsStyle="primary" block>Unfollow</Button>: null}*/}
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
export default UserSuggestion
