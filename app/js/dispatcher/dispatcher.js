'use strict';

var request = require('superagent');
var _ = require('lodash');

module.exports = function(resources, actions) {
	var dispatch = {};
	_.forEach(resources, function(resource) {
		dispatch[resource.name] = {};
		dispatch[resource.name].store = [];

		dispatch[resource.name][actions.CREATE] = function(newObj, comp) {
			request
				.post(resource.url, newObj)
				.end(function(err, res) {
					if(err) console.log(err);
					dispatch[resource.name].store = res.body;
					var state = {};
					state[resource.name.toLowerCase()] = dispatch[resource.name].store;
					this.setState(state);
				}.bind(comp));
		};

		dispatch[resource.name][action.READ] = function(comp) {
			request
				.get(resource.url)
				.end(function(err, res) {
					if(err) console.log(err);
					dispatch[resource.name].store.push(res.body);
					var state = {};
					state[resource.name.toLowerCase()] = dispatch[resource.name].store;
					this.setState(state);
				}.bind(comp));
		};
	});

	return dispatch;
};