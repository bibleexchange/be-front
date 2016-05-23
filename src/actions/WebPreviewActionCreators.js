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
				  console.log('request success',xhr);
				  
				  let type = ActionTypes.PREVIEW_SUCCESS;
				  let action = {url:url, body: xhr.response}
				  
				  dispatch(type, action);
			  };

			  xhr.onerror = function() {
				dispatch(ActionTypes.PREVIEW_FAILED,err);
			  };

			  xhr.send();
	}
} 