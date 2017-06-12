import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Layout from './components/Layout';
import Home from './pages/Home';
import Test from './pages/Test';
import Competitive from './pages/Competitive';
import PlayerCompetitive from './pages/PlayerCompetitive';
import HeroesPage from './pages/HeroesPage';

var routing = (
	<Router history={hashHistory}>
		<Route path="/" component={ Layout }>
			<IndexRoute component={ Home }></IndexRoute>
      <Route path="competitive" name="competitive" component={ Competitive }></Route>
      <Route path="competitive/:player" name="competitive" component={ PlayerCompetitive }></Route>
			<Route path="heroes" name="heroes" component={ HeroesPage }></Route>
			<Route path="test" name="test" component={ Test }></Route>
		</Route>
	</Router>
)
export default routing;