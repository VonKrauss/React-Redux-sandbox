import React from 'react'
import Heroes from '../components/Heroes'

export default class Competitive extends React.Component {
	render() {
		return (
			<div id="home">
				<h2>Heroes</h2>
				<Heroes />
			</div>
		);
	}
}