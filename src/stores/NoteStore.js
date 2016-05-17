import ActionTypes from '../util/ActionTypes';
import BaseStore from './BaseStore';
import Helper from '../util/MyHelpers.js';
import marked from 'marked';

class NoteStore extends BaseStore {
	
	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));		
		
		this._id = false;
		this._body = false;
		this._object_type = false;
		this._object = false;
		this._bible_verse_id = false;
		this._user = false;
		
		this._error = false;
		this._loading = true;
		
		this.meta = {
			name : "NoteStore"
		};
	}
	
	 _registerToActions(payload) {
 
		  switch(payload.type){			  

			case ActionTypes.NOTE_FETCH:
				this.logChange(payload);
				this._error = false;
				this._loading = true;
				this.emitChange();
			  break;
			
			case ActionTypes.NOTE_SUCCESS:
				this.logChange(payload);
				this._setNote(payload.action.body.data.notes[0]);
				this._loading = false;
				this._error = false;
				this.emitChange();
			  break;
			
			case ActionTypes.NOTE_FAILED:
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
			id:this._id,
			body:this._body,
			object_type:this._object_type,
			object:this._object,
			bible_verse_id:this._bible_verse_id,
			error: this._error,
			loading:this._loading
			};
		
		return x;
	}
	
	_setNote(data){
		console.log(data);
		this._id = data.id;
		this._body = data.body;
		this._user = data.user;
		this._object_type = data.object_type;
		this._object = JSON.parse(data.relatedObject)[0];
		this._bible_verse_id = data.bible_verse_id;	
	}
	
	_getBody(file){
	
		 switch(file.name.split('.')[1]){			  
			
			case 'md':
				return {__html:  this._base64(file.content)};
			  break;

			case 'html':
				return {__html:  this._base64(file.content, false)};
			  break;
			
			default:
			  return {__html:  this._base64(file.content)};
		  }		
	}
 
	_base64(encoded, isMarkDown=true) {
		if(isMarkDown){
			return this._createMarkup(this.bibleLinks(atob(encoded)));
		}else{			
			return this.bibleLinks(atob(encoded));
		}
	}

	bibleLinks(body){
		return body;
		return body.replace(/([A-Za-z]+) ([0-9]+):([0-9]+)|([0-9]+)* ([A-Za-z]+) ([0-9]+):([0-9]*)|([A-Za-z]+) ([A-Za-z]+) ([0-9]+):([0-9]*)|([A-Za-z]+) ([of]+) ([A-Za-z]+) ([0-9]+)([:0-9]*)/g,'[$1$8$9$12$13$14$4$5 $2$10$15$6:$3$11$16$7](/bible/$1$8$9$12$13$14$4$5/$2$10$15$6/$3$11$16$7)');
		}

	 _createMarkup(markup){
		return marked(markup); 
	}
}

export default new NoteStore();