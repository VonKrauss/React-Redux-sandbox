import React from 'react'
import Heroes from '../components/Heroes'
import PlayerAvatar from '../components/PlayerAvatar'
import SrCounter from '../components/SrCounter'
import Graph from '../components/Graph'
import Dates from '../lib/Dates'
/*
	- get updates from db
	- get data from api
	if there's new data to add:
		- put update in db
		- put update in state
*/

export default class Competitive extends React.Component {
	
	constructor() {
		super();
		this.state = {
			updates: [],
			limit: 10,
			player: {},
			loading: true
		};
		this.user = 'necKros-21595';
		$.get('http://localhost:5959/games/'+this.user+'?limit='+this.state.limit,(data)=>{
			this.setState((prevState)=>{
				return {...prevState, updates: data.updates.reverse(), player: data.player, loading: false};
			});
		});
	}
	toggleLoading() {
		this.setState((prevState)=>{
			return {...prevState, loading: !prevState.loading};
		})
	}
	update() {
		if(!this.state.loading) {
			console.info("Starting update...")
			this.toggleLoading();
			$.get('http://localhost:5959/update/'+this.user, (data)=>{
				console.log(data);
				this.setState((prevState)=>{
					if(data.update){
						prevState.updates.push(data.update);
						prevState.player.games += data.update.games;
						prevState.player.wins += data.update.wins;
					}
					prevState.player.avatar = data.player.avatar;
					console.log(data);
					return {...prevState, loading: false}
				})
			});
		}
	}
	updateSr() {
		this.setState((prevState)=>{
			var updates = prevState.updates;
			// updates[this.state.updates.length-1].sr = 3100;
			updates.push({ games: 3, wins: 3, sr: 2580 })
			return({...prevState, updates})
		});
	}
	render() {
		// console.info(this.state);
		// UPDATE BTN
		var loading = this.state.loading ? " loading" : "";
		// LAST UPDATE
		var lastUpdate = this.state.updates.length ? Dates.daysAgo(Dates.dateMake(this.state.updates[0].date)) : ""; 
		// UPDATES
		var updates = this.state.updates.map((obj,i)=>{
			return (
				<div class="box inline" key={i}>
					<h3>{obj.sr}</h3>
					<div>{obj.wins}/{obj.games}</div>
				</div>
			);
		})
		if(this.state.updates.length) {
			var winrate = (Math.round((this.state.player.wins/this.state.player.games)*10000))/100 + "%";
			return (
				<section id="competitive">
					<article id="player_header">
						<PlayerAvatar img={ this.state.player.avatar }/>
						<div class="player_name">
							<strong>{ "necKros" }</strong>
							<span class="faded">{ "#21595" }</span>
						</div>
						<SrCounter sr={ this.state.updates[this.state.updates.length-1].sr }/>
						<button class={"update-btn" + loading } onClick={ this.update.bind(this) }>{this.state.loading ? "Updating" : "Update"}</button>
					</article>
					<div id="player_summary">
						<div class="col"><div class="box">Games<strong class="float-right">{this.state.player.games}</strong></div></div>
						<div class="col"><div class="box">Wins<strong class="float-right">{this.state.player.wins}</strong></div></div>
						<div class="col"><div class="box">Winrate<strong class="float-right">{winrate}</strong></div></div>
					</div>
					<div id="player_graph">
						<Graph nodes={ this.state.updates }/>
					</div>
					<div id="debug">
					{
							// Debug items
							// <button class="update-btn" onClick={ ()=>{ this.updateSr() } }>Animate Sr</button>
							// <div class="inline-list">{updates}</div>
							// <button class="update-btn" onClick={ ()=>{ this.updateSr() } }>Animate Sr</button>
					}
					</div>
				</section>
			);
		} else {
			return <div>Loading...</div>
		}
	}
}