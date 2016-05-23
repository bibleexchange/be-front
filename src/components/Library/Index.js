import React from 'react';
import LibraryStore from '../../stores/LibraryStore';
import LibraryActionCreators from '../../actions/LibraryActionCreators';
import Loading from '../Loading';
import NotebookListing from './Notebook';
		
class LibraryIndex extends React.Component {

	componentWillMount(){
		this.state = this._getState();
		LibraryActionCreators.getNotebooks(LibraryStore.getAll().page.currentPage,5);		
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
		LibraryActionCreators.getNotebooks(1,5);
	}
	
  render() {

	let content = '';
	
	if(this.state.library.loading){
		content = this.loading();
	}else if(this.state.library.error){
		content = this.error();
	}else{
		content = this.success();
	}

    return (
		<div id="minimal-list" className="container" >	
			<div>		
				{this.state.content}
				
				<Pagination loadMore={this.loadMore.bind(this)} />
				
			</div>			
		</div>
    )
  }

	loading(){
		console.log('loading data...');
		return <h2 style={{textAlign:'center'}}>Loading...<Loading /></h2>;
	}
	error(){
		console.log('Something went wrong :(', this.state.repos.error);
		return this.state.repos.error.message;
	}
	success(){

		this.state.content = this.state.library.notebooks.map((n)=>{
				return <NotebookListing key={Math.random()+n.id} data={n} />;
			});
	}
	
	loadMore(){
		LibraryActionCreators.getNotebooks(this.state.library.page.currentPage+1,5);
	}

}

class Pagination extends React.Component {
  	
	componentWillMount(){
		this.state = this._getState();		
	}
	
	_getState() {
		return LibraryStore.getAll().page;
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
  
  render() {
	
	let content = <p>(end of list)</p>;
	
	if(this.state.hasNextPage){
		content = <button onClick={this.props.loadMore}>Load More {this.state.currentPage} of {this.state.numberOfPages}</button>;
	}
	
    return (	
		<div>{content}</div>
    )
	
  }

}

module.exports = LibraryIndex;