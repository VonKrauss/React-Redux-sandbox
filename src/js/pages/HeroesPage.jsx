import React from 'react'
import Heroes from '../components/Heroes'

export default class HeroesPage extends React.Component {
	render() {
		return (
			<div id="home">
				Redux store tests / Async API call test
				<h2>Heroes</h2>
				<Heroes />
			</div>
		);
	}
}