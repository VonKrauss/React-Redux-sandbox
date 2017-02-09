import React, { Component } from 'react';

class PlayerAvatar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div class="player-avatar" style={ {backgroundImage: `url('${this.props.img}')`} }></div>
        );
    }
}

export default PlayerAvatar;
