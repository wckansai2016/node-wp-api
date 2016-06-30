'use strict';

global.jQuery = require('jquery');
global.$ = jQuery;

var app = require('./app.js');
var api = 'http://api.wp-app.org/wp-json/wp/v2/posts';

app.init(api);
