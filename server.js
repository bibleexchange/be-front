'use strict';

// Module dependencies
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const chokidar = require('chokidar');
const express = require('express');
const graphQLHTTP = require('express-graphql');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const clean = require('require-clean').clean;
const exec = require('child_process').exec;

const APP_PORT = config.appPort;
const GRAPHQL_PORT = config.graphqlPort;

let graphQLServer;
let appServer;

function startAppServer(callback) {
  // Serve the Relay app
 var compiler = webpack(config);
 appServer = new WebpackDevServer(compiler,	
	{
		proxy: { "/graphql/query" :"http://localhost:"+GRAPHQL_PORT+"/graphql/query"},
		hot: true,
		historyApiFallback: true
	});
 
  // Serve static resources
  appServer.use('/', express.static(path.resolve(__dirname, 'dist')));
  appServer.use(webpackHotMiddleware(compiler));
  
  appServer.listen(APP_PORT, () => {
    console.log(`App is now running on http://localhost:${APP_PORT}`);
    if (callback) {
      callback();
    }
  });
}

/*
function startGraphQLServer(callback) {
  // Expose a GraphQL endpoint
  clean('./data/schema');
  const {Schema} = require('./data/schema');
  const graphQLApp = express();
  graphQLApp.use('/', graphQLHTTP({
    graphiql: true,
    pretty: true,
    schema: Schema,
  }));
  graphQLServer = graphQLApp.listen(GRAPHQL_PORT, () => {
    console.log(
      `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
    );
    if (callback) {
      callback();
    }
  });
}
*/

function startServers(callback) {
  // Shut down the servers
  if (appServer) {
    appServer.listeningApp.close();
  }
/*
  if (graphQLServer) {
    graphQLServer.close();
  }
*/
  // Compile the schema
  exec('npm run update-schema', (error, stdout) => {
    console.log(stdout);
    let doneTasks = 0;
    function handleTaskDone() {
      doneTasks++;
      if (doneTasks === 2 && callback) {
        callback();
      }
    }
    //startGraphQLServer(handleTaskDone);
    startAppServer(handleTaskDone);
  });
}
const watcher = chokidar.watch('./data/{database,schema}.js');
watcher.on('change', path => {
  console.log(`\`${path}\` changed. Restarting.`);
  startServers(() =>
    console.log('Restart your browser to use the updated schema.')
  );
});
startServers();
