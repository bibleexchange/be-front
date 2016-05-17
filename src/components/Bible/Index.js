import React from 'react';
import { browserHistory, Link } from "react-router";
import Navigation from './Navigation';
import BibleActionCreators from '../../actions/BibleActionCreators';
import BibleStore from '../../stores/BibleStore';
import BibleChapterStore from '../../stores/BibleChapterStore';

require('../../stylesheets/bible.scss');
 
class BibleIndex extends React.Component {
	
	componentWillMount(){
		if(BibleChapterStore.getAll().url === null && this.props.params.book === undefined){
			BibleActionCreators.getRandomChapter();
		}
	}
	
  render() {
	
	return (
      <div>			
		<Navigation params={this.props.params} />
		{this.props.children}
      </div>
    )
  }
  
}

module.exports = BibleIndex;