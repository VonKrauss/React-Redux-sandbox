import React from 'react'
import Heroes from '../components/Heroes'
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
      loading: true
    };
    this.user = 'necKros-21595';
    $.get('http://localhost:5959/games/'+this.user+'?limit=3',(data)=>{
      this.setState((prevState)=>{
        return {...prevState, updates: data.updates.reverse(), loading: false};
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
          }
          return {...prevState, loading: false}
        })
      });
    }
  }
	render() {
    // UPDATE BTN
    var loading = this.state.loading ? "loading" : "";
    var updateBtn = <i class={ "update_btn " + loading } title="Reload data" onClick={ this.update.bind(this) }></i>
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

		return (
			<div id="home">
				<h2>Competitive tracker</h2>
        <span class="faded">Last update: { lastUpdate } { updateBtn }</span>
        <div>{ updates }</div>
			</div>
		);
	}
}