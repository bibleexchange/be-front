import React from 'react';
import Relay from 'react-relay';

import SessionStore from '../stores/SessionStore';
import ProfileStore from '../stores/ProfileStore';
import { Route, Link } from 'react-router';
import UserSessionControl from './UserSessionControl';
import SessionActionCreators from '../actions/SessionActionCreators';
import AppConstants from '../util/AppConstants';
import { Navbar } from 'react-bootstrap';

require('../stylesheets/app.scss'); 
require('../stylesheets/banner.scss');
require('../stylesheets/images.scss');
require('../stylesheets/print.scss');
require('../stylesheets/typography.scss');
require('../../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss');

var beLogo = require('../static/images/be_logo.png');

class AppR extends React.Component {

  componentWillMount(){
	  
	 this.state = this._getState();
	  
	 let token = SessionStore.hasJWT();
		
		if(token){
			console.log('&*&*&* AUTO CHECKING USER WITH LOCAL STORAGE.');
			SessionActionCreators.getUser(token);
		} 
  }
  
  _getState() {
		return {
			user: {
				session: SessionStore.getState(),
				profile: ProfileStore.getState()
				}
			};
  }
  
 componentDidMount() {
    this.changeListener = this._onChange.bind(this);
    SessionStore.addChangeListener(this.changeListener);
	ProfileStore.addChangeListener(this.changeListener);
  }

   _onChange() {
    let newState = this._getState();
    this.setState(newState);	
  }
	
  componentWillUnmount() {
    SessionStore.removeChangeListener(this.changeListener);
	ProfileStore.removeChangeListener(this.changeListener);
  }

  render() {  
	let title = AppConstants.SITE_TITLE;
	
    return (
      <div> 
	    <Navbar animated staticTop fluid style={{marginBottom: 0}}>
			<Navbar.Header pullLeft>
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span> 
				</button>
			  <Navbar.Brand>
				 <Link to="/">
					<img className="pull-left" style={{marginLeft:"15px"}} src={beLogo} alt="Bible exchange logo" /> 
					{title}
				  </Link>
			  </Navbar.Brand>
			</Navbar.Header>
			<div className="collapse navbar-collapse" id="myNavbar">
				<UserSessionControl url={this.props.location.pathname} user={this.state.user} route={this.props.route}/>
			</div>
		  </Navbar>
		{this.props.children}
      </div>
    );
  }	
}

AppR.contextTypes = {
    router: React.PropTypes.object.isRequired
};

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Note</h1>
        <ul>
          {/*this.props.user.notes.edges.map(edge =>
            <li key={edge.node.id}>{edge.node.text} (ID: {edge.node.id})</li>
          )*/}
        </ul>
      </div>
    );
  }
}
//http://localhost:3000/graphql?query=
export default Relay.createContainer(App, {
  fragments: {
    user: () => Relay.QL`
      query+GetUser{   users(id: "1") {     firstname } }`,
  },
});