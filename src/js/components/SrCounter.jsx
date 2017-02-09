import React, { Component } from 'react';

class SrCounter extends Component {

	constructor(props) {
		super(props);
		this.sr = this.props.sr;
	}
	animateSr(n,done) {
		// var n = parseInt($('.sr-counter').text()) + Math.random()*1000;
		$({ counter: parseInt($('.sr-counter').text()) }).animate({ counter: n }, {
			duration: 1500,
			step: function () {
				$('.sr-counter').text(Math.ceil(this.counter));
			},
			done: done,
		});
	}
	getSrTier() {
		const sr = this.sr;
		const tiers = [
			{name: "bronze", minSr: 1},
			{name: "silver", minSr: 1500},
			{name: "gold", minSr: 2000},
			{name: "platinum", minSr: 2500},
			{name: "diamond", minSr: 3000},
			{name: "master", minSr: 3500},
			{name: "grandmaster", minSr: 4000}
		];
		for(let i=tiers.length-1; i>=0; i--) {
			if(sr > tiers[i].minSr) return tiers[i].name;
		}
	}
	updateSrTier() {
		this.sr = this.props.sr;
		$('.sr-counter').removeClass().addClass('sr-counter').addClass(this.getSrTier());
	}
	componentDidUpdate() {
		this.animateSr(this.props.sr, this.updateSrTier.bind(this));
	}
	render() {
		return (
			<div class={"sr-counter "+this.getSrTier()}>{this.sr}</div>
			);
	}
}

export default SrCounter;
