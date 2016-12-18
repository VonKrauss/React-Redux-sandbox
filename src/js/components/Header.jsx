import React from 'react'
import { Link } from 'react-router';
export default class Header extends React.Component {
	render() {
		return (
			<header>
				<h1 class="page_title">Overattached 2.0</h1>
				<nav id="main_menu">
					<Link to="/">Home</Link>
					<Link to="/competitive">Competitive</Link>
					<Link to="/test">Test</Link>
				</nav>
			</header>
		);
	}
}