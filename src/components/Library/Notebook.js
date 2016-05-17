import React from 'react';
import NotebookStore from '../../stores/NotebookStore';
import LibraryActionCreators from '../../actions/LibraryActionCreators';
import Loading from '../Loading';
import { Link } from 'react-router';
import Template from './Template';

class Notebook extends React.Component {

	componentWillMount(){
		this.state = this._getState();
		LibraryActionCreators.getNotebook(this.props.params.notebook.split("-")[0]);
	}
	
	_getState() {
		return {
			notebook:NotebookStore.getAll(),
			content: ''
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);	
		NotebookStore.addChangeListener(this.changeListener);
	}
	
	_onChange(){	
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentWillUnmount(){
		NotebookStore.removeChangeListener(this.changeListener);
	}
	
	componentWillReceiveProps(newProps){
		if(newProps.notebook !== this.props.params.notebook){
			LibraryActionCreators.getNotebook(newProps.params.notebook.split("-")[0]);
		}
	}
	
  render() {
	
	let r = this.state.notebook;
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
		
		if(!this.state.notebook.notebook.manifestFile && this.state.notebook.notebook.notes.length <= 0){
			setTimeout(()=>{
				ActionCreators.githubNotebook("/"+this.props.params.notebook);
			});
		}else if(this.state.notebook.error.documentation_url === "https://developer.github.com/v3/#rate-limiting"){
			setTimeout(()=>{
				ActionCreators.localNotebook("/"+this.props.params.notebook);
			});
		}
	}
	success(){
		this.state.content = <Template data={this.state.notebook.data} />;
	}
	
}

module.exports = Notebook;