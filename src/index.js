import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './home.css';
import SignUp from './Signup';
import Login from './Login';
import Home from './Home';
import User from './UserProfile';
import EditProfile from './EditProfile';
import AdminPanel from './AdminPanel';
import UsersInfo from './UsersInfo';
import AdminLogin from './AdminLogin';
import Suggest from './suggestion';
import Forgot from './forgot';
import UserData from './UserData';
import Follow from './Follow';
import Follower from './Follower';
import PasswordReset from './passwordReset';
import UserSuggestion from './UserSuggestion';
import Compress from './imageCompress'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Route} from 'react-router-dom';




ReactDOM.render((
        <Router>
            <div>
                <Route exact path="/" component={Login} />
                <Route exact path="/SignUp" component={SignUp}/>
                <Route exact path="/Home" component={Home}/>
                <Route exact path="/User_detail" component={User}/>
                <Route exact path="/Edit-profile" component={EditProfile} />
                <Route exact path="/admin" component={AdminLogin} />
                <Route exact path="/admin/Users/:id" component={UsersInfo} />
                <Route exact path="/admin/panel" component={AdminPanel} />
                <Route exact path="/auth/:token" component={Login}/>
                <Route exact path="/suggestion" component={Suggest}/>
                <Route exact path="/forgot" component={Forgot} />
                <Route exact path="/passwordReset/:token" component={PasswordReset} />
                <Route exact path="/userData/:id" component={UserData} />
                <Route exact path="/adminPanel" component={AdminPanel} />
                <Route exact path="/UserSuggestion" component={UserSuggestion} />
                {/*<Route exact path="/compress" component={Compress}/>*/}
                <Route exact path="/Following" component={Follow}/>
                <Route exact path="/Follower" component={Follower}/>


            </div>
        </Router>
    ), document.getElementById('root'));
registerServiceWorker();
