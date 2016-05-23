import ActionTypes from '../util/ActionTypes';
import BaseStore from './BaseStore';

class NotebookStore extends BaseStore {
	
	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		
		this._data = false;
		
		this.meta = {
			name : "NotebookStore"
		};

		this._error = false;
		this._loading = true;
	}
	
	 _registerToActions(payload) {
 
		  switch(payload.type){			  
			
			case ActionTypes.NOTEBOOK_FETCH:
				this.logChange(payload);
				this._error = false;
				this._loading = true;
				this.emitChange();
			  break;
			
			case ActionTypes.NOTEBOOK_SUCCESS:
				this.logChange(payload);
				this.updateNotebook(payload.action.body.data.notebooks[0]);
				this._loading = false;
				this._error = false;
				this.emitChange();
			  break;
			
			case ActionTypes.NOTEBOOK_FAILED:
				this.logChange(payload);
				this._error = payload.action.error;				
				this._loading = false;
				this.emitChange();
			  break;	
			
			default:
			  return true;
		  }
	  }
	  
	 getAll(){

		const x = {
			data: this._data,
			error: this._error,
			loading:this._loading
			};
		
		return x;
	}
	
	updateNotebook(data){

		data.notes.map(function(n,k){
			
			let testFirst = JSON.parse(n.relatedObject);
			
			if(Array.isArray(testFirst)){
				data.notes[k].relatedObject = testFirst[0];
			}else{
				data.notes[k].relatedObject = testFirst;
			}
			
			data.notes[k].verse = JSON.parse(n.verse);
		});
		
		this._data = data;
		
	}
	
}

export default new NotebookStore();