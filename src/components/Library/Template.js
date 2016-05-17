import React from 'react';
import { Link } from 'react-router';

class Template extends React.Component {

  render() {
	let n = this.props.data;
	let notes = n.notes;
	
	if(notes == undefined){
		notes = [];
	}
	
    return (
		<div>
				<h1>{n.title}</h1>
				
				<ol>
				{notes.map(function(note,index){
					
					let verse = JSON.parse(note.verse);
					
					return <li key={index}>{note.body}<br /> <Link to={verse.url}>{verse.reference}</Link> {verse.t}<hr /></li>;
				})}
				</ol>
		</div>
    )
  }

}
module.exports = Template;