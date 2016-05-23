import React from 'react';
import WebPreviewStore from '../stores/WebPreviewStore';
import WebPreviewActionCreators from '../actions/WebPreviewActionCreators';
import Loading from './Loading';
import { Link } from 'react-router';
import MyHelpers from '../util/MyHelpers';

require('../stylesheets/typography-textbook.scss');

class WebPreview extends React.Component {

	componentWillMount(){
		this.state = this._getState();
		WebPreviewActionCreators.getPreview(this.props.url);
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
		this.state.content = <h2 style={{textAlign:'center'}}>Loading...<Loading /></h2>;
	}
	error(){
		console.log('Something went wrong :(', this.state.notebook.error);
		this.state.content = this.state.notebook.error.message + " ------- <a href='" + this.state.notebook.error.documentation_url + "'>Read More</a>";
	}
	success(){
		this.state.content = <div className="textbook" dangerouslySetInnerHTML={this.createMarkup()}></div>;
	}
	
	createMarkup() {
		return {__html: this.state.preview.body}; 
	};
	
}

module.exports = WebPreview;