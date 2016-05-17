import React from 'react';
import { Link } from 'react-router';

class NotebookListing extends React.Component {
	
  render() { 
	let n = this.props.data;
	  
	return (
		<li><Link to={n.url}>{n.title}</Link></li>
		);
	}
}

module.exports = NotebookListing;