import { dispatchAsync } from '../util/AppDispatcher';
import ActionTypes from '../util/ActionTypes';
import AppConstants from '../util/AppConstants';
import RequestService from '../util/RequestService';

export default {
   	getNotebooks: (page,perPage) => {
		
		let promise = RequestService.getNotebooks(page,perPage);
			
			dispatchAsync(promise, {
			  request: ActionTypes.NOTEBOOKS_FETCH,
			  success: ActionTypes.NOTEBOOKS_SUCCESS,
			  failure: ActionTypes.NOTEBOOKS_FAILED
			}, { page, perPage });
		
	},
	
	getNotebook: (id) => {
		let promise = RequestService.getNotebook(id);
		
		dispatchAsync(promise, {
		  request: ActionTypes.NOTEBOOK_FETCH,
		  success: ActionTypes.NOTEBOOK_SUCCESS,
		  failure: ActionTypes.NOTEBOOK_FAILED
		}, { id });
		 
	},
	
	getNote: (path,dir) => {
		let promise = RequestService.getNote(path,dir);
		
		dispatchAsync(promise, {
		  request: ActionTypes.NOTE_FETCH,
		  success: ActionTypes.NOTE_SUCCESS,
		  failure: ActionTypes.NOTE_FAILED
		}, { path });

		 
	}
} 