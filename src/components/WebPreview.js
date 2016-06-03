import React from 'react';
import WebPreviewStore from '../stores/WebPreviewStore';
import Loading from './Loading';
import { Link } from 'react-router';
import MyHelpers from '../util/MyHelpers';
import WebPreviewActionCreators from '../actions/WebPreviewActionCreators';

require('../stylesheets/typography-textbook.scss');

class WebPreview extends React.Component {

	componentWillMount(){
		this.state = this._getState();
	}

	_getState() {
		
		let store = WebPreviewStore.getAll();
		
		return {
			store: store,
			content: '',
			preview: MyHelpers.getFromJSON(store.previews, this.props.url)
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);	
		WebPreviewStore.addChangeListener(this.changeListener);
		
		if(this.props.url !== undefined){
		  WebPreviewActionCreators.getPreview(this.props.url);
		}
	}
	
	_onChange(){	
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentWillUnmount(){
		WebPreviewStore.removeChangeListener(this.changeListener);
	}
	
  render() {
	
	let r = this.state.store;
	let content = '';
	
	if(r.loading){
		this.loading();
	}else if(r.error){
		this.error();
	}else{
		this.success();
	}

    return (
		<div>{this.state.content}</div>
    )
  }

	loading(){
		console.log('loading data...');
		this.state.content = <div style={{textAlign:'center', fontSize:"4rem"}}>Loading...<Loading /></div>;
	}
	error(){
		console.log('Something went wrong :(', this.state.notebook.error);
		this.state.content = <div>{this.state.notebook.error.message} ------- <a href={this.state.notebook.error.documentation_url} >Read More</a></div>;
	}
	success(){
		this.state.content = <div dangerouslySetInnerHTML={this.createMarkup()}></div>;
	}
	
	createMarkup() {
		return {__html: this.state.preview? this.state.preview.body:''}; 
	};
	
}

//WebPreview;.defaultProps = { math: 0 };

module.exports = WebPreview;