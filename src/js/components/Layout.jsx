import React from 'react'
import Header from './header'
import GS from '../GlobalState'

export default class Layout extends React.Component {
	render() {
		return (
			<div class="page">
			<Header />
			<section class="page-content">
				{ GS.data }
				{ this.props.children }
			</section>
			</div>
		);
	}
}