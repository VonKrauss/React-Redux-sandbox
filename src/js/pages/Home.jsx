import React from 'react'

export default class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			counter: 0
		};
	}

	updateCounter(n) {
		this.setState((prevState) => {
			return { counter: prevState.counter + n }
		});
	}

	render() {
		return (
			<div id="home">
				<span>State test</span>
				<h3>{ this.state.counter }</h3>
				<div class="counter">
					<button onClick={ () => { this.updateCounter(1)  } } data-value="1">+1</button>
					<button onClick={ () => { this.updateCounter(-1) } } data-value="-1">-1</button>
				</div>
			</div>
		);
	}
}