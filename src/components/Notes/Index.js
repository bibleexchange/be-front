import React from 'react';
import NoteStore from '../../stores/NoteStore';
import ActionCreators from '../../actions/NoteActionCreators';
import Loading from '../Loading';
import { Link } from 'react-router';
import { safeUrl } from 'util/MyHelpers';

class Index extends React.Component {

	componentWillMount(){
		this.state = this._getState();
		ActionCreators.getNote(this.props.params.note);
	}
	
	_getState() {
		return {
			note:NoteStore.getAll(),
			content: ''
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);	
		NoteStore.addChangeListener(this.changeListener);
	}
	
	_onChange(){	
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentWillUnmount(){
		NoteStore.removeChangeListener(this.changeListener);
	}
	
	componentWillReceiveProps(newProps){
		ActionCreators.getNote(newProps.params.note);
	}
	
  render() {
	
	let r = this.state.note;
	let content = '';
	
	if(r.loading){
		this.loading();
	}else if(r.error){
		this.error();
	}else{
		this.success();
	}

    return (
		<div>
			<hr />
				<div className="container">
					<Link to="/" > BACK </Link>{/*///this.context.router.goBack()*/}
				</div>
			<hr />
			
			<div className="container">
				{this.state.content}
			</div>	
		
		</div>
    )
  }

	loading(){
		console.log('loading data...');
		this.state.content = <h2 style={{textAlign:'center'}}>Loading...<Loading /></h2>;
	}
	
	error(){
		console.log('Something went wrong :(', this.state.note.error);		
	}
	
	success(){
		this.state.content = this.chooseType(this.state.note);
	}

	chooseType(note){
		
		switch(note.object_type){
			case "Recording":
				return <Recording data={note} />;
				break;
			case "Link":
				return <ExternalLink data={note} />;
				break;
			default:
				return null;
		}
		
	}  
  
}

class Recording extends React.Component {
  render() {	  
    return (<div>

		<h1><i className="glyphicon glyphicon-headphones"></i> {this.props.data.object.title}</h1>
		
		<p>
		<img src={this.props.data.object.defaultImage.src} 
			description={this.props.data.object.defaultImage.name} 
			alt={this.props.data.object.defaultImage.alt_text}
		/>
		</p>
		
		{this.props.data.object.formats.map(function(f){
			
			let player = '';
			
			if(f.host === "soundcloud"){
				player = <SoundCloudPlayer file={f.file} />;
			}
			
			return (
				<div key={f.id}>
				
				{player}
				
				{/*FILE: {f.file} <br/>
				FORMAT: {f.format} <br/>
				HOST: {f.host} <br/>
				ID: {f.id} <br/>
				MEMO: {f.memo} <br/>
				RECORDING ID: {f.recording_id} <br/>
				STREAM: {f.stream}
				*/}
				<div dangerouslySetInnerHTML={{__html: f.download}} />
				<hr />
				</div>);
			
		})}
		
		<p>{this.props.data.body}</p>
		
		<ul>
			<li>{this.props.data.object.bible_verse_id}</li>
			<li>{this.props.data.object.id}</li>
			<li>{this.props.data.object.created_at}</li>
			<li>{this.props.data.object.date}</li>
			<li>{this.props.data.object.dated}</li>
			<li>{this.props.data.object.title}</li>
			<li>{this.props.data.object.description}</li>
			<li>{this.props.data.object.genre}</li>
			<li>{this.props.data.object.updated_at}</li>
			<li>{this.props.data.object_type}</li>
		</ul>
		
		</div>
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

class SoundCloudPlayer extends React.Component {
  render() {	  
    return (
		<iframe width="100%" height="166" scrolling="no" frameborder="no" src={"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+this.props.file+"&amp;color=0066cc&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=false&amp;show_reposts=false"}></iframe>
    )
  }
  
}

module.exports = Index;