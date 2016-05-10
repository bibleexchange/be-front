import React from 'react';
import { Link } from 'react-router';
import { safeUrl } from 'util/MyHelpers';

class Note extends React.Component {
 
  render() {	

  console.log(this.props);
  
    return (
		<div>
			<sup>{this.props.verse}</sup>
			{this.chooseView(this.props)}		
		</div>
    )
  }

	chooseView(o){
		
		switch(o.object_type){
			case "Recording":
				let recording = JSON.parse(o.relatedObject);
				return <Recording data={recording[0]} noteID={o.id} />;
				break;
			case "Link":
				let link = JSON.parse(o.relatedObject);
				return <ExternalLink data={link[0]} note={o}/>;
				break;
			default:
				return null;
		}
		
	}  
  
}

class Recording extends React.Component {
  render() {	  
  console.log(this.props);
    return (
		<p><i className="glyphicon glyphicon-headphones"></i> <Link to={"/notes/"+this.props.noteID+"#"+safeUrl(this.props.data.title)} >{this.props.data.title}</Link></p>
    )
  }
  
}

class ExternalLink extends React.Component {
  render() {	  
    return (
		<div>
			<i className="glyphicon glyphicon-link"></i> 
			{this.props.note.body} 
			<Link to={this.props.data.url} > {this.props.data.url}</Link>
		</div>
    )
  }
  
}



module.exports = Note;