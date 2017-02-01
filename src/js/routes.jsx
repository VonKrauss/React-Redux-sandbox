import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from './components/Layout';
import Home from './pages/Home';
import Test from './pages/Test';
import Competitive from './pages/Competitive';
import HeroesPage from './pages/HeroesPage';

var routing = (
	<Router history={hashHistory}>
		<Route path="/" component={ Layout }>
			<IndexRoute component={ Home }></IndexRoute>
      <Route path="competitive" name="Competititve" component={ Competitive }></Route>
			<Route path="heroes" name="Heroes" component={ HeroesPage }></Route>
			<Route path="test" name="Test" component={ Test }></Route>
		</Route>
	</Router>
)
export default routing;