import React from 'react'
import Header from './header'
import GlobalState from '../GlobalState'

export default class Layout extends React.Component {
	render() {
		return (
			<div class="page">
			<Header />
			<section class="page-content">
				{ GlobalState.data }
				{ this.props.children }
			</section>
			</div>
		);
	}
}