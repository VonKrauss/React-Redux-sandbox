import React from 'react'

import PlayerAvatar from '../components/PlayerAvatar'
import PlayerName from '../components/PlayerName'
import SrCounter from '../components/SrCounter'
import Graph from '../components/Graph'
import Toaster from '../components/Toaster'
import {Link} from 'react-router'
import Dates from '../lib/Dates'
/*
	- get updates from db
	- get data from api
	if there's new data to add:
		- put update in db
		- put update in state
*/

export default class PlayerCompetitive extends React.Component {
	
	constructor(props) {
		super(props);
		// if(this.params)
		this.state = {
			status: "INITIAL",
			updates: [],
			limit: 10,
			player: {},
			loading: true,
			toasts: [
				{ type: "info", message: "This is a test toast" }
			]
		};
		this.getUpdates();
	}

	getUpdates() {
		this.user = this.props.params.player;
		$.get('http://localhost:5959/games/'+this.user+'?limit='+this.state.limit,(data)=>{
			// console.info("/games Data:");
			// console.info(data);
			if(data.player == null) {
				this.setState((prevState)=>{
					return {...prevState, status: "CREATE_PLAYER"};
				});
				$.get('http://localhost:5959/create/'+this.user,(data)=>{
					if(data.error) {
						this.setState((prevState)=>{
							return {...prevState, status: "PLAYER_NOT_FOUND"};
						});
					} else {
						this.setState((prevState)=>{
							return {...prevState, player: data.player, updates: data.updates, loading: false, status: "PLAYER_LOADED"};
						});
					}
				});
			} else {
				this.setState((prevState)=>{
					return {...prevState, updates: data.updates.reverse(), player: data.player, loading: false, status: "PLAYER_LOADED"};
				});
			}
		});
	}

	componentDidUpdate() {
		// console.log("Component will update");
		// console.log(this.user);
		// console.log(this.props.params.player);
		if(this.user != this.props.params.player) {
			location.reload(true);
		}
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
				// console.log(data);
				this.setState((prevState)=>{
					if(data.update){
						prevState.updates.push(data.update);
						if(prevState.updates.length > this.state.limit) {
							prevState.updates.shift();
						}
						prevState.player.games += data.update.games;
						prevState.player.wins += data.update.wins;
					}
					prevState.player.avatar = data.player.avatar;
					// console.log(data);
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
		if(this.state.status == "CREATE_PLAYER") return(
			<section id="competitive">
				<div class="container centered">
					<div class="loader block"></div>
					<h2 class="thin">Looking for player <strong class="accent">{this.user}</strong>...</h2>
				</div>
			</section>
		);
		if(this.state.status == "PLAYER_NOT_FOUND") return(
			<section id="competitive">
				<div class="container centered">
					<h2 class="thin">Player <strong class="accent">{this.user}</strong> doesn't seem to exist in this region.</h2>
					<Link to="/competitive"><div class="btn">Go back</div></Link>
				</div>
			</section>
		)
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
		if(this.state.status == 'PLAYER_LOADED') {
			var winrate = (Math.round((this.state.player.wins/this.state.player.games)*10000))/100 + "%";
			return (
				<section id="competitive">
					<article id="player_header">
						<PlayerAvatar img={ this.state.player.avatar }/>
						<PlayerName name={this.state.player.username} />
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
					<Toaster toasts={this.state.toasts} />
					<div id="debug">
						<button class="btn" onClick={ ()=>{ Toaster.prototype.insertToast('Test') } }>Insert toast</button>
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
			return (
				<div class="container centered">
					<div class="loader block"></div>
					<h2 class="thin">Loading...</h2>
				</div>)
		}
	}
}