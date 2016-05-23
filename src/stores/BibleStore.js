import ActionTypes from '../util/ActionTypes';
import BaseStore from './BaseStore';
import books from '../util/BibleBooks';

class BibleStore extends BaseStore {
	
	constructor(){
		super();
		this.subscribe(() => this._registerToActions.bind(this));
		
		this._books = books.list;
		
		this._nav = [];
		
		this.meta = {
			name : "BibleStore"
		};
	}
	
	 _registerToActions(payload) {
 
		  switch(payload.type){			  
			
			case ActionTypes.GET_VERSE:
				this.logChange(payload);
				this.addVerse(payload.action.body.data.bibleverses[0]);
				this.emitChange();
			  break;	
			
			case ActionTypes.GET_CHAPTER:
			  this.logChange(payload);
			  this.addVerse(payload.action.body.data.biblechapters[0].verses[0]);
			  this.emitChange();
			  break;
			
			default:
			  return true;
		  }
	  }
	
//GETTERS:	
	/*
	
	var local = localStorage.getItem('versestore');
		localStorage.setItem("versestore", JSON.stringify(this.getAll()));
		if(local){
	
	*/
	
	addVerse(data){
		let newVerse = {
			id: data.id,
			b: data.b,
			c: data.c,
			v: data.v,
			body:  data.body,
			reference:  data.reference,
			url:  data.url,
			chapterURL:  data.chapterURL,
			bible_chapter_id: data.bible_chapter_id,
			notes: data.notes
		};

		this._nav.unshift(newVerse);
	}
	
	getAll(){
		return {
			nav: this._nav,
			books: this._books
			};
	}
	
	get books(){
		return this._books;
	}
	
	get nav(){
		return this._nav;
	}

}

export default new BibleStore();