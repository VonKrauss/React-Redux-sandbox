import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default class MapPage extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 41.395386903847836,
      lng: 2.1619462966918945,
      zoom: 20,
    };
  }
  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
        url='http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}'
        attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        subdomains='abcd'
        minZoom="0"
        maxZoom="15"
        ext='png'
        />
        <Marker position={position}>
          <Popup>
            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
          </Popup>
        </Marker>
      </Map>
      );
  }
}