import React from 'react'
import { Link } from 'react-router';
export default class Toaster extends React.Component {
	constructor(props) {
		super(props);
		this.toasts = this.props.toasts.map((toast,i)=>{
			return <article class={"toast "+toast.type} key={i}>{toast.message}</article>
		});
	}
	componentDidMount() {
		$('#toaster').detach().insertAfter('#page');
	}
	insertToast(message,type) {
		if(!type) type = 'info';
		this.setState((prevState)=>{
			var toasts = prevState.toasts;
			toasts.push({
				type,
				message
			});
			var t = setTimeout(this.popToast.bind(this),3000);
			console.log(toasts);
			return {...prevState, toasts: toasts}
		})
	}
	popToast() {
		this.setState((prevState)=>{
			var toasts = prevState.toasts;
			toasts.shift();
			console.log(toasts);
			return {...prevState, toasts}
		})
	}
	render() {
		return (
			<section id="toaster">
				{
					this.props.toasts.map((toast,i)=>{
						return <article class={"toast "+toast.type} key={i}>{toast.message}</article>
					})
				}
			</section>
		);
	}
}