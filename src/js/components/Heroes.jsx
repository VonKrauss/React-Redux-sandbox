import React from 'react'
import { Link } from 'react-router'
import Loader from './Loader'
import store from '../store'

export default class Heroes extends React.Component {
	constructor() {
		super();
		this.state = {
			data: null
		};
		this.getData();
	}
	getData() {
		$.get( "https://api.lootbox.eu/pc/eu/necKros-21595/competitive/heroes", (data) => {
		  $( ".result" ).html( data );
		  console.log( "OW API ---- Response was received ----" );
		  data = JSON.parse(data);
		  this.setState(
		  	{ data : data }
		  );
		  store.dispatch({ type: 'STORE_HEROES_COMP', data: data});
		});
	}
	render() {
		var out;
		if(this.state.data) {
			var heroes = this.state.data.map((hero, i)=>{
				if(hero.playtime == "--") hero.playtime = "0 minutes";
				return (
					<div class="inline col" key={ i }>
						<article class="box">
							<div class="icon inline"><img src={ hero.image } alt={ hero.name } /></div>
							<div class="inline v-middle">
								<h3>{ hero.name }</h3>
								<span class="faded"><strong>Playtime: </strong>{ hero.playtime }</span>
							</div>
						</article>
					</div>
				);
			})
			out = (<div>{ heroes }</div>);
		} else {
			out = (<Loader />);
		}
		return (
			<section>
				{ out }
			</section>
		);
	}
}