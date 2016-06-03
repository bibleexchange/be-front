import { dispatch, dispatchAsync } from '../util/AppDispatcher';
import ActionTypes from '../util/ActionTypes';
import AppConstants from '../util/AppConstants';
import RequestService from '../util/RequestService';
import GitHubApi from '../components/Github';

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
	// XHR for Chrome/Firefox/Opera/Safari.
	xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
	// XDomainRequest for IE.
	xhr = new XDomainRequest();
	xhr.open(method, url);
  } else {
	// CORS not supported.
	xhr = null;
  }
  return xhr;
}	

const github = new GitHubApi({
			// required
			version: "3.0.0",
			// optional
			debug: true,
			protocol: "https",
			host: "api.github.com", // should be api.github.com for GitHub
			timeout: 5000,
			headers: {
				"Access-Control-Request-Method": "GET",
				"Access-Control-Request-Headers": "X-Custom-Header",
				"Accept":"application/vnd.github.v3+json",
				"User-Agent": "Bible-Exchange-App",
				"Origin":"http://localhost:3000"
			}
		});

export default {
   	getPreview: (url) => {
		
		if(getIt(url)){
			console.log("Retrieving Article from Storage");
			let storedRespone = getIt(url);
			
			let type = ActionTypes.PREVIEW_SUCCESS;
			let action = {url:url, body: storedRespone};

			let promise = getIt(url);
		
			dispatchAsync(promise, {
			  request: ActionTypes.FETCH_CHAPTER,
			  success: ActionTypes.ADD_CHAPTER,
			  failure: ActionTypes.FETCH_FAILED
			}, { id });
			
			dispatch(type, action);
			
		}else{
			remoteRequest(url);
		}
		

	}
} 

function remoteRequest(url){
			let options = {
			method: "GET",
			url:url
		};
		
		let xhr = createCORSRequest(options.method, options.url);
			 
			 if (!xhr) {
				alert('CORS not supported');
				return;
			  }

			  // Response handlers.
			  xhr.onload = function() {
				  
				  let type = ActionTypes.PREVIEW_SUCCESS;
				  let action = {url:url, body: xhr.response}
				  
				  storeIt(url,xhr.response);
				  dispatch(type, action);
			  };

			  xhr.onerror = function() {
				dispatch(ActionTypes.PREVIEW_FAILED,err);
			  };

			  xhr.send();
}

function storeIt(key,object){
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem(key, object);
		return true;
	} else {
		console.log(" Sorry! No Web Storage support..");
		return false;
	}
}

function getIt(key){
	return localStorage.getItem(key);
}