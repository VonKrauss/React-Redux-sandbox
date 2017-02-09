import React from 'react'
import { Link } from 'react-router';
export default class Header extends React.Component {
	render() {
		var links = [
			{
				route: "/competitive",
				id: "competitive",
				title: "Comp"
			},
			{
				route: "/heroes",
				id: "heroes",
				title: "Heroes"
			},
			{
				route: "/test",
				id: "test",
				title: "Test"
			},
		].map((obj,i)=>{
			var active = this.props.menuActive == obj.id ? "active" : null;
			return <li key={i}><Link to={obj.route} id={obj.id} class={active}>{obj.title}</Link></li>
		});
		return (
			<header id="top_header">
				<Link to="/"><div class="inline-block" id="page_logo"></div></Link>
				<ul id="main_menu" class="inline-list inline-block">
					{ links }
				</ul>
			</header>
		);
	}
}