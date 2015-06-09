'use strict';

var React = require('react');
var SingleResource = require('./components/single_resource.jsx');
var RESOURCE_CNST = require('./components/resource_constants');
var ACTION_CNST = rquire('./components/action_constants');

var Dispatch = require('./dispatcher/dispatcher');
var dispatch = Dispatch(RESOURCE_CNST, ACTION_CNST);

React.render(<SingleResource title="Notes:" resourceUrl="/api/notes" dispatch={dispatch} />, document.body);