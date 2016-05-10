import React from 'react';
import Link from 'react-router/lib/Link';
import UserNotifications from './UserNotifications';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

class UserNavigation extends React.Component {
	
  render() {
	  
	 const nav = this.props.nav; 

    return (
	
	 <Nav bsStyle="pills" onSelect={this.handleSelect}>
		<UserNotifications user={this.props.user}/>
        <NavDropdown title="Bible" id="nav-dropdown">
			<Link to="/bible">Holy Bible</Link>
		  	{nav.bible.map(function(nav,index){
				return (<Link key={index} to={nav.url}>{nav.title}</Link>);
			})}
        </NavDropdown>
		<NavDropdown title="Library" id="nav-dropdown">
		  <Link to="/library" >Library</Link> 
			{this.myLibrary(nav)}
        </NavDropdown>
      </Nav>
    );
  }
  
  myLibrary(nav){
	  if(this.props.user.session.isReady && this.props.user.profile.isReady){
		  
		  let x = nav.bible.map(function(nav,index){
				return (<MenuItem key={index}><Link to="/user/notebooks" className="btn btn-large btn-default" style={{width:"100%"}}>My Notebooks &amp; Notes</Link></MenuItem>);
			});
			
		return x;
	 }
  }
  
}

module.exports = UserNavigation;