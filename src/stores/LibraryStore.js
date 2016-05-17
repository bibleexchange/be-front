import ActionTypes from '../util/ActionTypes';
import BaseStore from './BaseStore';

class LibraryStore extends BaseStore {
	
	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		
		this._notebooks = [];
		this._page = 1;
		this._error = false;
		this._loading = true;
		
		
		this.meta = {
			name : "LibraryStore"
		};
	}

	 _registerToActions(payload) {
		 
		  switch(payload.type){
			case ActionTypes.NOTEBOOKS_SUCCESS:
				this.logChange(payload);
				this.addNotebook(payload.action.body.data.notebooks);
				this._page = payload.action.action.page;
				this._error = false;
				this._loading = false;
				this.emitChange();
				break;
			  
			default:
			  return true;
		  }
	  }
	
	addNotebook(data){
		let newArray = this._notebooks.concat(data);
		this._notebooks = newArray;
	}
	
	getAll(){
		return {
			notebooks: this._notebooks,
			page: this._page,
			error: this._error,
			loading:this._loading
		};
	}	
}

export default new LibraryStore();