import ActionTypes from '../util/ActionTypes';
import BaseStore from './BaseStore';
import Helper from '../util/MyHelpers.js';
import marked from 'marked';

class WebPreviewStore extends BaseStore {
	
	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));		
		
		this._previews = [];
		
		this._error = false;
		this._loading = true;
		
		this.meta = {
			name : "NoteStore"
		};
	}
	
	 _registerToActions(payload) {
 
		  switch(payload.type){			  

			case ActionTypes.PREVIEW_FETCH:
				this.logChange(payload);
				this._error = false;
				this._loading = true;
				this.emitChange();
			  break;
			
			case ActionTypes.PREVIEW_SUCCESS:
				this.logChange(payload);
				this._addPreview(payload.action.body, payload.action.url);
				this._loading = false;
				this._error = false;
				this.emitChange();
			  break;
			
			case ActionTypes.PREVIEW_FAILED:
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
		return {
			previews:this._previews,
			error: this._error,
			loading:this._loading
			};
	}
	
	_addPreview(html,url){
		let newPreview = {id:url, body:html};
		this._previews = this._previews.concat(newPreview);
		
	}
	
}

export default new WebPreviewStore();