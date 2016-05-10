import React from 'react';
import { browserHistory, Link } from "react-router";
import Navigation from './Navigation';
import BibleActionCreators from '../../actions/BibleActionCreators';
import BibleStore from '../../stores/BibleStore';
import BibleChapterStore from '../../stores/BibleChapterStore';
import SearchStore from '../../stores/SearchStore';

require('../../stylesheets/bible.scss');
 
class BibleIndex extends React.Component {

	componentWillMount(){
		this.state = this._getState();	

		if(BibleChapterStore.getAll().url === null && this.props.params.book === undefined){
			BibleActionCreators.getRandomChapter();
		}
	}
	
	_getState() {
		return {
			books: BibleStore.books,
			chapters: BibleChapterStore.getAll(),
			search: SearchStore.getAll()
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);
		BibleStore.addChangeListener(this.changeListener);
		BibleChapterStore.addChangeListener(this.changeListener);
		SearchStore.addChangeListener(this.changeListener);	    
	}
	
	_onChange(){		
		let newState = this._getState();
		this.setState(newState);	
		if(!this.props.params.book && newState.chapters.url){browserHistory.push(newState.chapters.url);}		
	}
	
	componentWillUnmount(){
		BibleStore.removeChangeListener(this._onChange);
		BibleChapterStore.removeChangeListener(this._onChange);
		SearchStore.removeChangeListener(this._onChange);
	}
	
  render() {
	
	return (
      <div>			
		<Navigation chapter={this.state.chapters} search={this.state.search.term} books={this.state.books} />
		 
		{this.props.children}
		 
      </div>
    )
  }
  
}

module.exports = BibleIndex;