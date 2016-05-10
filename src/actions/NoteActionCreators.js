import { dispatch, dispatchAsync } from '../util/AppDispatcher';
import ActionTypes from '../util/ActionTypes';
import RequestService from '../util/RequestService';

export default {   
   
  create: (note) => {
	let promise = RequestService.createNote(note);
	
	dispatchAsync(promise, {
	  request: ActionTypes.NOTE_CREATE_REQUEST,
	  success: ActionTypes.NOTE_CREATE_SUCCESS,
	  failure: ActionTypes.NOTE_CREATE_FAILED
	}, { note });
		
  },
  
	getNote: (id) => {
		let promise = RequestService.getNote(id);
		
		dispatchAsync(promise, {
		  request: ActionTypes.NOTE_FETCH,
		  success: ActionTypes.NOTE_SUCCESS,
		  failure: ActionTypes.NOTE_FAILED
		}, { id });
		 
	},
  
  update: (updatedNote) => {
    dispatch(ActionTypes.NOTE_UPDATE,updatedNote);
  },
  
  destroy: (id) => {	  
    dispatch(ActionTypes.NOTE_DESTROY,id);
  }
  
} 