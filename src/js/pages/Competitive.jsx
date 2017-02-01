import React from 'react'
import Heroes from '../components/Heroes'

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
      updates: []
    };
    $.get('http://localhost:5959/games/necKros-21595?limit=3',(data)=>{
      console.log(data);
      this.setState({
        updates: data.updates
      });
    });
  }

	render() {
    var updates = this.state.updates.map((obj,i)=>{
      return (
        <div class="box" key={i}>
          <h3>{obj.sr}</h3>
          <div>{obj.wins}/{obj.games}</div>
        </div>
      );
    })
		return (
			<div id="home">
				<h2>Competitive tracker</h2>
        { updates }
			</div>
		);
	}
}