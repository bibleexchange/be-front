import React from 'react';
import BibleActionCreators from '../../actions/BibleActionCreators';
import BibleStore from '../../stores/BibleStore';
import BibleVerseFocus from '../Bible/BibleVerseFocus';
import BibleNavigation from '../Bible/Navigation';

class BibleMini extends React.Component {
	
    constructor(props) {
		super(props);	
		this.state = this._getState();
	}
  
	_getState() {
		return BibleStore.getAll();
    }
  
 componentDidMount() {
    this.changeListener = this._onChange.bind(this);
	BibleStore.addChangeListener(this.changeListener);
  }

   _onChange() {
    let newState = this._getState();
    this.setState(newState);
  }

  componentWillUnmount() {
	BibleStore.removeChangeListener(this.changeListener);
  }
	
  render() {

    return (
		<div>
					
			<BibleNavigation />
			
			{this.state.nav.map(function(nav,index){
				return (<BibleVerseFocus key={index} data={nav} />);
			})}
					
		</div>
    )
  }
}

module.exports = BibleMini;