import React, { Component } from 'react';
import particleEngine from './particle-engine.js';

class ParticleBackground extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { config } = this.props;
        particleEngine(this.canvas, config);
    }
    render() {
        const { width, height } = this.props;
        return (
            <canvas ref={(c)=>this.canvas = c} width={width} height={height}></canvas>
        );
    }
}

export default ParticleBackground;
