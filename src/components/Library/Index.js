import React from 'react';
import LibraryStore from '../../stores/LibraryStore';
import LibraryActionCreators from '../../actions/LibraryActionCreators';
import Loading from '../Loading';
import NotebookListing from './NotebookListing';
		
class LinkedIndex extends React.Component {

	componentWillMount(){
		this.state = this._getState();
		LibraryActionCreators.getNotebooks(1);
	}
	
	_getState() {
		return {
			library:LibraryStore.getAll(),
			content: ''
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);	
		LibraryStore.addChangeListener(this.changeListener);
	}
	
	_onChange(){	
		let newState = this._getState();
		this.setState(newState);		
	}
	
	componentWillUnmount(){
		LibraryStore.removeChangeListener(this.changeListener);
	}
	
	componentWillReceiveProps(){
		LibraryActionCreators.getNotebooks(1);
	}
	
  render() {
	
	let l = this.state.library;
	let content = '';
	
	if(l.loading){
		this.loading();
	}else if(l.error){
		this.error();
	}else{
		this.success();
	}

    return (
		<div id="minimal-list" className="container" >	
			<div>
				<h1>Library</h1>				
				<ul>
				{this.state.content}
				
				<button onClick={this.loadMore.bind(this)}>Load More</button>
				
				</ul>
			</div>			
		</div>
    )
  }

	loading(){
		console.log('loading data...');
		this.state.content = <h2 style={{textAlign:'center'}}>Loading...<Loading /></h2>;
	}
	error(){
		console.log('Something went wrong :(', this.state.repos.error);
		this.state.content = this.state.repos.error.message;
	}
	success(){
		this.state.content = this.state.library.notebooks.map((n)=>{
				return <NotebookListing key={Math.random()} data={n} />;
			});
	}
	
	loadMore(){
		LibraryActionCreators.getNotebooks(this.state.library.page+1);
	}
	
}

module.exports = LinkedIndex;