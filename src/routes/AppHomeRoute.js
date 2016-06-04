'use strict';

import Relay, {
  Route,
} from 'react-relay';

export default class TodoAppRoute extends Route {
  static paramDefinitions = {
    status: {required: false},
  };
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
  static routeName = 'AppHomeRoute';
}