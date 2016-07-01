'use strict';

var ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    browserHistory = ReactRouter.browserHistory;

var HomePage = require('../pages/home');
var NotFoundPage = require('../pages/not-found');

module.exports = (
    <Router history={browserHistory}>
        <Route path="/">
            <IndexRoute component={HomePage} />
        </Route>
        <Route path="*" component={NotFoundPage} />
    </Router>
);