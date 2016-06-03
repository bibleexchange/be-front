import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

//import browserHistory from 'react-router/lib/browserHistory';
//import Router from 'react-router/lib/Router';
//import routes from './routes';

import App from './components/App';
import AppHomeRoute from './routes/AppHomeRoute';

ReactDOM.render(
  <Relay.RootContainer
    Component={App}
    route={new AppHomeRoute()}
  />,
  document.getElementById('root')
);