import React from 'react';
import { Link } from "react-router";
import Search from './Search';
import VerseSelector from './VerseSelector';
import BibleActionCreators from '../../actions/BibleActionCreators';
import SearchActionCreators from '../../actions/SearchActionCreators';
import BibleStore from '../../stores/BibleStore';
import BibleChapterStore from '../../stores/BibleChapterStore';
import SearchStore from '../../stores/SearchStore';

class Navigation extends React.Component {
	
	componentWillMount(){
		this.state = this._getState();	
		if(BibleStore.getAll().nav.length < 1){BibleActionCreators.getRandomChapter();}
	}
	
	_getState() {
		return {
			search: SearchStore.getAll(),
			chapter: BibleChapterStore.getAll(),
			bible: BibleStore.getAll()
		};
	}

	componentDidMount(){	
		this.changeListener = this._onChange.bind(this);	
		BibleStore.addChangeListener(this.changeListener);
		BibleChapterStore.addChangeListener(this.changeListener);    
		SearchStore.addChangeListener(this.changeListener);
	}
	
	componentWillUnmount(){
		BibleStore.removeChangeListener(this._onChange);
		BibleChapterStore.removeChangeListener(this._onChange);
		SearchStore.removeChangeListener(this._onChange);
	}
	
	_onChange(){	
		let newState = this._getState();
		this.setState(newState);		
	}
	
  render() {
	const styles = {
		btn:{border:'none', background:'transparent'},
		next:{border:'none', background:'transparent'},
		previous:{border:'none', background:'transparent'}
	};
	
    return (	
		<div className="blueBG" style={{marginBottom:'25p', textAlign:'center'}}>
			<Link to={!this.state.chapter.previous[1] ? "":this.state.chapter.previous[1]} className="btn btn-default" style={styles.previous}>
				<span className="glyphicon glyphicon-chevron-left"></span>
			</Link>

			<Search term={this.state.search.term} changeHandler={this.searchChangeHandler} submitHandler={this.bibleSearchSubmitHandler.bind(this)}/>

			<Link to={!this.state.chapter.next[1] ? "":this.state.chapter.next[1]}  className="btn btn-default" style={styles.next} onClick={this.props.getNextHandler}>
				<span className="glyphicon glyphicon-chevron-right"></span>
			</Link>
					
			<VerseSelector books={this.state.bible.books}/>
		</div>
    )
  }
  
	searchChangeHandler(event) {
		SearchActionCreators.updateSearch(event.target.value);
	  }
	
	bibleSearchSubmitHandler(event) {
		event.preventDefault();
		console.log('search submitted...');
		this.setState({redirect:true});
		BibleActionCreators.getChapterByReference(this.state.search.term);
	}
	
}

module.exports = Navigation;