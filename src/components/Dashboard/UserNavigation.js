import React from 'react';
import Link from 'react-router/lib/Link';
import UserNotifications from './UserNotifications';
import { Row, Col } from 'react-bootstrap';
import BibleVerseFocus from '../Bible/BibleVerseFocus';
import BibleNavigation from '../Bible/Navigation';
import Template from '../Library/Template';

class UserNavigation extends React.Component {
	
  render() {
	  
	const nav = this.props.nav; 
	var notebooksList = null;
	
	if(this.props.notebooks !== "undefined"){
		notebooksList = <Template data={this.props.notebooks} />;
	}else{
		notebooksList = null;
	}
	
    return (
	<Row>
		<Col xs={12} md={6}>
			<h2>Bible</h2>
			
			<BibleNavigation params={this.props.params} />
			
	  		{nav.bible.map(function(nav,index){
				return (<BibleVerseFocus key={index} data={nav} />);
			})}
		</Col>
		<Col xs={12} md={6}>
			<h2>Notebooks</h2>
			
			{notebooksList}
			
		</Col>
	</Row>
    );
  }
  
}

module.exports = UserNavigation;