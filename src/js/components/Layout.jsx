import React from 'react'
import Header from './header'

export default class Layout extends React.Component {
	render() {
		return (
			<div class="page">
			<Header />
			<section class="page-content">
				{ this.props.children }
			</section>
			</div>
		);
	}
}