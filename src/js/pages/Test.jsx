import React from 'react'
export default class Test extends React.Component {
	render() {
		return (
			<div id="test">
				<span>Api calls</span>
        <div><a href="http://localhost:5959/games/neckros-21595" target="_blank">Get player games</a></div>
        <div><a href="http://localhost:5959/update/necKros-21595" target="_blank">Update player</a></div>
        <div><a href="http://localhost:5959/create/necKros-21595" target="_blank">Create player</a></div>
			</div>
		);
	}
}