'use strict';

import Relay from 'react-relay';
import React, { Component } from 'react';

class TodoApp extends Component {
  constructor(props, context) {
    super(props, context);
    this._handleStatusChange = this._handleStatusChange.bind(this);
  }
  _handleStatusChange(status) {
    this.props.relay.setVariables({status});
  }
  render() {
    return (
		<h1>
		{this.props.totalCount}
		</h1>
    );
  }
} 

export default Relay.createContainer(TodoApp, {
  initialVariables: {
    status: 'any',
  },
  fragments: {
    viewer: variables => Relay.QL`
      fragment on User {
        totalCount
      }
    `,
  },
});

const styles = {
  actionList: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingTop: 20,
  },
  footer: {
    height: 10,
    paddingHorizontal: 15,
  },
  header: {
    alignSelf: 'center',
    color: 'rgba(175, 47, 47, 0.15)',
    fontFamily: 'sans-serif-light',
    fontSize: 100,
    fontWeight: '100',
  },
  list: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    flex: 1,
    shadowColor: 'black',
    shadowOffset: {
      height: -2,
    },
    shadowOpacity: 0.03,
    shadowRadius: 1,
  },
};