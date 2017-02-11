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