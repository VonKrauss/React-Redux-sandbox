import React from 'react'

export default class Layout extends React.Component {
	render() {
		return (
			<div class="page">
			<header><h1>Overattached 2.0</h1></header>
			<section class="page-content">
				{ this.props.children }
			</section>
			</div>
		);
	}
}