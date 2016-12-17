var routing = (
	<Router history={hashHistory}>
		<Route path="/" component={Layout}>
			<IndexRoute component={Featured}></IndexRoute>
			<Route path="archives(/:article)" name="archives" component={Archives}></Route>
			<Route path="settings" name="settings" component={Settings}></Route>
			<Route path="map" name="mapa" component={Map}></Route>
		</Route>
	</Router>
)
export default routing;
