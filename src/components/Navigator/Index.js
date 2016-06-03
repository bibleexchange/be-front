import React from 'react';
import { Link } from "react-router";
import Search from './Search';
import Picker from './Picker';
import SearchActionCreators from '../../actions/SearchActionCreators';
import NotebookStore from '../../stores/NotebookStore';
import SearchStore from '../../stores/SearchStore';

import { Grid, Row, Col } from 'react-bootstrap';

class NavigationIndex extends React.Component {
	
	componentWillMount(){
		this.state = this._getState();
	}
	
	_getState() {
		return {
			search: SearchStore.getAll()
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);	  
		SearchStore.addChangeListener(this.changeListener);
	}
	
	componentWillUnmount(){
		SearchStore.removeChangeListener(this._onChange);
	}
	
	_onChange(){	
		let newState = this._getState();
		this.setState(newState);		
	}
	
  render() {
	
	const style = {color:'white',border:'none', background:'transparent', backgroundColor:"transparent"};
	
	let next = '';
	let previous = '';
	
	if(this.props.currentPage < this.props.maxPages){
		
		let nextPage = parseInt(this.props.currentPage)+parseInt(1);
		next = <Next url={this.props.baseUrl+"/"+nextPage} style={style}/>;
	}

	if(this.props.currentPage != 1){
		let previousPage = parseInt(this.props.currentPage)-parseInt(1);
		previous = <Previous url={this.props.baseUrl+"/"+previousPage} style={style}/>;
	}
	
    return (	
		<Grid fluid className="greenBG" style={{textAlign:'center', marginLeft:'-15px', marginRight:'-15px'}}>
			<Row>
				<Col sm={4} >
					{previous}
				</Col>
					{/*<Search term={this.state.search.term} changeHandler={this.searchChangeHandler} submitHandler={this.searchSubmitHandler.bind(this)} buttonStyle={style}/>*/}
				
				<Col sm={4} >				
					<Picker pages={this.props.pages} style={style} baseUrl={this.props.baseUrl}/>
				</Col>	
				
				<Col sm={4} >
					{next}
				</Col>	

			</Row>
		</Grid>
    )
  }
  
	searchChangeHandler(event) {
		SearchActionCreators.updateSearch(event.target.value);
	  }
	
	searchSubmitHandler(event) {
		event.preventDefault();
		console.log('search submitted...');
		this.setState({redirect:true});
		BibleActionCreators.getChapterByReference(this.state.search.term);
	}
	
}

class Next extends React.Component {
	
  render() {
	  
	    return (<Link to={this.props.url} >
				<span className="glyphicon glyphicon-chevron-right" style={this.props.style}></span>
			</Link>
    )
  }	
}

class Previous extends React.Component {
	
  render() {
	
    return (<Link to={this.props.url}>
				<span className="glyphicon glyphicon-chevron-left" style={this.props.style} ></span>
			</Link>
    )
  }	
}

module.exports = NavigationIndex;