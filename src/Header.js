import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Col, Grid, Row, Form, FormControl} from 'react-bootstrap';
import logo1 from './images/logo1.png';
import './home.css';
import axios from 'axios';
import LocalStorage from "localstorage";
import ip from './env'

class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            notif:false,
            search:[],
            noResult:false,
            userData:'',
            notification:[],
            noNotification:false,
            hashSearch:[]
        }
    }
    componentWillMount(){
        const foo = new LocalStorage('UserData');
        const abc = foo.get('UserData');
        this.setState({userData: abc[1]});

    }

    Notif=()=>{
        const self=this;
        let notif= this.state.notif;
       this.setState({notif:!notif});
       axios.post(`${ip}/api/notification`,{
           user_id:self.state.userData.data2._id
       })
           .then(response=>{
               console.log('notification Data', response);
                if(response.data.notificationData!==0){
                    self.setState({notification:response.data.notificationData,noNotification:false })
                }

               if(response.data.notificationData.length===0){
                   self.setState({noNotification:true})
               }
           })
           .catch(error=>{
               console.log(error);
           })

    };
    Hide=()=>{
        this.setState({notif:false});
    }


    handleSearch=(event)=>{
      document.getElementById('dropdown_user').style.display="block";
      const value = event.target.value;
      if(value===""){
          document.getElementById('dropdown_user').style.display="none";
      }
      const match = /^#.*$/;
      if(value.match(match)!==null){
          const self=this;
          const hashtag=value
          const hashtagNew = hashtag.replace('#','')
          axios.post(`${ip}/api/hashtagSearch`,{
              hashData:hashtagNew
          })
              .then(response=>{
                  console.log('hashtag search data', response);
                  if (response.data.hashtag.length !== 0) {
                      self.setState({hashSearch: response.data.hashtag, search:[], noResult: false});

                  }
                  if (response.data.hashtag.length === 0) {
                      self.setState({noResult: true, hashSearch: response.data.hashtag});
                      console.log('no result found')
                  }
              })
              .catch(error=>{
                  console.log(error);
              })
      }
      else if(value!=="" && value.match(match)===null) {

          const self = this;
          axios.post(`${ip}/api/search`, {
              searchData: value,
              username:self.state.userData.data2.username
          })
              .then(function (response) {
                  console.log(response);

                  if (response.data.length !== 0) {
                      self.setState({search: response.data, hashSearch:[], noResult: false});

                  }
                  if (response.data.length === 0) {
                      self.setState({noResult: true, search: response.data});
                      console.log('no result found')
                  }
              })
              .catch(function (error) {
                  console.log(error);
              })
      }

    };



    render(){
        return(
            <header>
                <Grid>
                    <Row >
                        <Col md={3} onClick={this.Hide}>
                            <div id="left-heading"  >
                                <Link to="/Home" style={{textdecoration:'none'}}>
                                        <img id="logo1" src={logo1} alt="Hestagram Logo" />
                                        <p id="logoText" >Hestagram</p>
                                </Link>
                            </div>
                        </Col> {/* end of col-md-6 */}
                        <Col md={6} onClick={this.Hide} >
                            <Form>
                                <Col md={6} mdOffset={3} className="search-input">
                                    <FormControl
                                        type="text"
                                        id="search"
                                        name="search"
                                        onChange={this.handleSearch}
                                        autoComplete="off"
                                        placeholder="Search..." />
                                    <div id="dropdown_user" >
                                        <ul>
                                            {this.state.hashSearch.map((item1, i1)=>{
                                                return<span key={i1}>
                                                        {item1.hashtag.map((tags, i)=>{
                                                            return <li key={i}>
                                                                        <Link to={'/userData/'+ item1.user_id}>{'#'+tags}</Link>
                                                                    </li>
                                                        })}

                                                </span>
                                            })}
                                        {this.state.search.map(function(item,i){

                                                return <li key={i}>
                                                    <Link to={'/userData/' + item._id}>{item.username}</Link>
                                                </li>

                                        })}
                                            {this.state.noResult?<li>
                                                <p id="noResult" >No result found</p>
                                            </li>:null}


                                        </ul>
                                    </div>
                                </Col>
                            </Form>
                        </Col>

                        <Col md={3}>
                            <div className="header-icons">
                                <ul>
                                    <li>
                                        <Link to="/UserSuggestion">
                                            <span title="Discover peoples" id="firstSpan" className="fa fa-compass" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="#" onClick={this.Notif}  >
                                            <span  className="fa fa-bell-o"/>
                                        </Link>
                                        {this.state.notif?<Notification data={this.state.notification} data2={this.state.noNotification} />: null}
                                    </li>
                                    <li>
                                        <Link to="/User_detail">
                                            <span className="fa fa-user-o"/>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col> {/* end of col-md-6 */}

                    </Row> {/* end of row */}
                </Grid>{/* end of container */}
            </header>
        );
    }
}
class Notification extends Component{

    render(){
        return(
            <div id="notification">

                <ul>

                    {this.props.data.map((item, i)=>{

                        return <li key={i}>
                            <Link to={'/userData/' + item.id}>
                                <h5><strong>{item.Name}</strong> <span>start following you</span></h5>
                            </Link>

                        </li>

                    })}
                    {this.props.data2?<li>
                        No notification found
                    </li>:null}


                </ul>
            </div>
        );
    }
}
export default Header