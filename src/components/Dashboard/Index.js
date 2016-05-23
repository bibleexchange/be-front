import React from 'react';
import Link from 'react-router/lib/Link';
import ProfileStore from '../../stores/ProfileStore';
import SessionStore from '../../stores/SessionStore';
import ThemeSquares from '../ThemeSquares';
import SessionActionCreators from '../../actions/SessionActionCreators';
import BibleMini from '../Bible/BibleMini';
import Notebook from '../Library/Index';

import { Grid, Row, Col } from 'react-bootstrap';

require('../../stylesheets/banner.scss');
require('../../stylesheets/typography.scss');
require('../../stylesheets/landing.scss');

var twitterLogo = require('../../static/svg/twitter-logo.svg');
var facebookLogo = require('../../static/svg/facebook-logo.svg');

class DashboardIndex extends React.Component {
	
    constructor(props) {
		super(props);	
		this.state = this._getState();
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

    return (
		<Grid fluid>
			
			 <Row>
				<Col xs={12} md={6} >
					<Link to="/bible"><h2 className="blueBG">Bible</h2></Link>
					<BibleMini />
				</Col>
				<Col xs={12} md={6} >
					<Link to="/notebooks"><h2 className="greenBG">Notebooks</h2></Link>
					
					<Notebook />
					
				</Col>
			</Row>
		  <Row>
				<Col md={8} mdOffset={2}>
					<div className="embed-container">
						<iframe style={{width:"100%", minHeight:"300px"}} src="https://player.vimeo.com/video/120753625" frameBorder="0" webkitAllowuFullScreen="" mozAllowFullScreen="" allowFullScreen=""></iframe>
					</div>
				</Col>
			</Row>
			
			<Row id="sub_be_banner" className="redBG">	
				<h1>Your place for Bible study and conversation.</h1>
			</Row>
			<Row>
				<ThemeSquares />
			</Row>
			
			<Row className="heading-box" style={{backgroundColor:"#FFB657"}} >
				<Col md={12}>
					<h2>Launched February 20, 2015</h2>
					<p>Journey with Us While We Grow</p>
					
					<p>
						<a href="https://twitter.com/bible_exchange">
							<img className="logo center-block" src={twitterLogo} alt="follow us on Twitter" />
						</a>
						<a href="https://www.facebook.com/thebibleexchange">
							<img className="logo center-block" src={facebookLogo} alt="like us on Facebook" />
						</a>
					</p>
				</Col>	
			</Row>	
			<Row className="heading-box" style={{backgroundColor:"rgb(0, 201, 137)"}}>
				<Col md={12}>
					<h2>We Gain by Trading</h2>
					<div className="center">		
						<p>…when he was returned &hellip; he commanded these servants to be called unto him, &hellip; that he might know how much every man had gained by trading. &mdash; Luke 19:15</p>
					</div>
				</Col>
			</Row>
			
		</Grid>
    )
  }
}

module.exports = DashboardIndex;