import React from 'react'


export default class Competitive extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			tag: "",
		}
	}
	handleSubmit() {
		console.info("Redirecting to /competitive/"+this.state.tag);
		this.props.router.push('/competitive/'+this.state.tag);
	}
	handleChange(e) {
		const tag = e.target.value;
		this.setState((prevState)=>{
			return{...prevState, tag}
		})
	}
	render() {
		return(
			<section class="competitive container">
				<h3>Insert the Battletag of the player you want to see.</h3>
				<form id="comp_search" onSubmit={ this.handleSubmit.bind(this) }>
					<input onChange={ this.handleChange.bind(this) } value={this.state.tag} id="battletag" type="text" size="20" class="big" />
				</form>
			</section>
		);
	}
}