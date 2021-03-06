// routes.js
import React from 'react';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import App from './components/App';
 
// Pages
import Bible from './components/Bible/Index';
import BibleChapterPage from './components/Bible/BibleChapterPage';
import BibleVersePage from './components/Bible/BibleVersePage';
import Dashboard from './components/Dashboard/Index';

import Library from './components/Library/Index';
import Notebook from './components/Notebook/Index';
import Note2 from './components/Library/Note';
import Note from './components/Notes/Index';

import NotebookEditor from './components/NotebookEditor/Index';
import NoteEditor from './components/NoteEditor/Index';
import LoginForm from './components/Session/LoginForm';
import NoMatch from './components/NoMatch';
import PasswordResetForm from './components/Session/PasswordResetForm';
import Search from './components/Search/Index';
import Session from './components/Session/Index';
import Signup from './components/Signup/Index';

import UserLibrary from './components/UserLibrary/Index';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Dashboard}></IndexRoute>
		
		<Route path="session" component={Session} >
			<Route name="login" path="login" component={LoginForm}></Route>
			<Route name="reset-password" path="reset-password" component={PasswordResetForm}></Route>
		</Route>
		
		<Route name="signup" path="/signup" component={Signup}></Route>
		<Route path="search/:term(/:page)" component={Search} ></Route>				
		<Route path="bible" component={Bible} >
			<Route path=":book/:chapter" component={BibleChapterPage}></Route>
			<Route path=":book/:chapter/:verse" component={BibleVersePage}></Route>
		</Route>
		<Route path="user" component={UserLibrary} >
			<Route path="notebook/:id" component={NotebookEditor}></Route>
			<Route path="note/create(/:reference)" component={NoteEditor}></Route>
			<Route path="note/:note/edit" component={NoteEditor}></Route>
		</Route>

		<Route path="notebooks" component={Library}></Route>
		
		<Route path="notebooks">
			<Route path=":notebook(/:note)" component={Notebook} />
			<Route path=":no999tebook/:note" component={Note2} />
		</Route>

		<Route path="notes/:note" component={Note} />
		
		<Route path="*" component={NoMatch}/>
	</Route>
);