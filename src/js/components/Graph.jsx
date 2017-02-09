import React from 'react'

export default class Graph extends React.Component {
	constructor(props) {
		super(props);
		var widthSegment, srMin, srMax; 
		var debug = false;
		// debug = true;
		// var nodes = [
		// 	{games: 2, wins: 2, sr: 2480, time: "2 hours ago"},
		// 	{games: 4, wins: 4, sr: 2465, time: "3 hours ago"},
		// 	{games: 1, wins: 0, sr: 2350, time: "6 hours ago"},
		// 	{games: 3, wins: 2, sr: 2370, time: "12 hours ago"},
		// 	{games: 4, wins: 0, sr: 2411, time: "Yesterday"},
		// 	{games: 2, wins: 2, sr: 2503, time: "02/05/16"},
		// 	{games: 2, wins: 2, sr: 2433, time: "02/05/16"},
		// 	{games: 2, wins: 2, sr: 2411, time: "02/05/16"},
		// 	{games: 2, wins: 2, sr: 2399, time: "02/05/16"},
		// 	{games: 2, wins: 2, sr: 2430, time: "02/05/16"},
		// ];
		var nodes = this.props.nodes;
		this.sketch = (p)=>{
			p.update = ()=>{
				// console.info("Updating graph...");
				widthSegment = ((p.width)/nodes.length);
				// Determine min and max graph references
				srMin = nodes[0].sr;
				srMax = nodes[0].sr;
				for(let i=1; i<nodes.length; i++) {
					if(nodes[i].sr>srMax) srMax = nodes[i].sr;
					if(nodes[i].sr<srMin) srMin = nodes[i].sr
				}
				srMax = Math.ceil((srMax+25)/50)*50;
				srMin = Math.floor((srMin-25)/50)*50;
				// console.log("min: "+srMin);
				// console.log("max: "+srMax);
			}
			p.setup = function () {
				p.createCanvas(640, 400);
				p.degrees();
				p.update();
			};
			p.draw = ()=>{
				p.clear();
				p.background(p.color(19, 23, 31, 128));
				p.ellipseMode(p.CENTER);
				p.beginShape();
				// Graph bars
				if(nodes.length<30) {
					for(let i=0; i<nodes.length; i++) {
						p.strokeWeight(2);
						p.stroke("#13171f");
						p.line(nodes[i].x,0,nodes[i].x,p.height);
					}
				}
				// Graph shape
				for(let i=0; i<nodes.length; i++) {
					p.fill(p.color(59,79,99,16));
					p.noStroke();
					p.vertex(nodes[i].x,nodes[i].y);
				}
				p.vertex(nodes[nodes.length-1].x, p.height);
				p.vertex(nodes[0].x,p.height)
				p.endShape();
				p.fill("#788292");
				p.text(srMax, widthSegment/2+10, 20);
				p.text(srMax, widthSegment/2+10, p.height/2+6);
				p.text(srMin, widthSegment/2+10, p.height-10);
				// Graph lines and dots
				for(let i=0; i<nodes.length; i++) {
					nodes[i].x = (widthSegment*i)+widthSegment/2;
					nodes[i].y = p.map(nodes[i].sr,srMin, srMax, p.height-20, 20);
					if(i>0){
						// Line joining points
						p.strokeWeight(5);
						let _from = p.color("#b90a29");
						let _to = p.color("#194295");
						p.stroke(p.lerpColor(_from,_to,p.map(i,0,nodes.length,0,1)));

						p.line(nodes[i-1].x,nodes[i-1].y,nodes[i].x,nodes[i].y)
						p.drawGraphPoint(nodes[i-1].x, nodes[i-1].y);
					}
					if(i==nodes.length-1) {
						p.drawGraphPoint(nodes[i].x, nodes[i].y);
					}
				}
				// Debug Text
				if(debug){
					p.fill("fff");
					p.noStroke();
					p.text("Nodes: "+nodes.length, 20, 20);
					p.text("MinSr: "+srMin, 20, 40);
					p.text("MaxSr: "+srMax, 20, 60);
					p.text("MouseY: "+p.mouseY, 20, 80);
				}
			};
			p.drawGraphPoint = (x,y)=>{
				if((p.mouseX > x-widthSegment/2 && p.mouseX < x+widthSegment/2)&& p.mouseY > 0 && p.mouseY <= p.height){
					// Outer red ellipse
					p.stroke("#8b1e32");
					p.strokeWeight(7);
					p.ellipse(x,y,13,13);
					// Inner White/Black ellipse
					p.stroke("#13171f");
					p.fill("#ffffff");
					p.strokeWeight(3);
					p.ellipse(x,y,13,13);
					// // Tooltip
					// rectWidth = 100;
					// rectHeight = 50;
					// noStroke();
					// rect(x-rectWidth/2,y-rectHeight-20,100,rectHeight);
					// rect(x,y-rectHeight-20,100,rectHeight);
				}
			}
		};
	}
	componentDidMount() {
		this.canvas = new p5(this.sketch, this.refs.wrapper);
	}
	componentWillReceiveProps(props, newprops) {
		// console.info("The props changed");
		this.canvas.update();
	}
	render() {
		return <div ref="wrapper"></div>
	}
}