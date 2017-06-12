import React from 'react'
import { Link } from 'react-router';
export default class PlayerName extends React.Component {
	render() {
		var tagPos = this.props.name.indexOf("-");
		var name = this.props.name.slice(0,tagPos);
		var tag = "#"+this.props.name.slice(tagPos+1,this.props.name.length);
		return (
			<div class="player_name">
				<div class="column line"></div>
				<div class="column middle">
					<strong>{ name }</strong>
					<span class="faded">{ tag }</span>
				</div>
				<div class="column line"></div>
			</div>
		);
	}
}