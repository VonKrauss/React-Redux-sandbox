import React from 'react'
import Header from './header'

export default class Layout extends React.Component {
	render() {
		return (
			<div id="page">
				<Header menuActive={ this.props.routes[1].name } />
				<section id="main_container">
					{ this.props.children }
				</section>
			</div>
		);
	}
}