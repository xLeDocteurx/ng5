import React, {Component} from 'react'
// import PNG5 from 'png5'
import PNG5 from '../../dist/index'

import P5 from '../../wrappers/P5Wrapper'
// import noise1DSketch from './noise1DSketch'
// import noise2DSketch from './noise2DSketch'
// import noise3DSketch from './noise3DSketch'

class FBM extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            noiseGenerator: new PNG5(),

            // meshSize: 200,

            // scaleValue: 1,
            scaleValue: 0.3,
            divisionValue: 64,
            offsetValue: 0,

            seedValue: 'seed',
            lodValue: 4,
            // lodValue: 1,
            falloffValue: 0.5,
            
            noise1DSketch: noise1DSketch,
            noise2DSketch: noise2DSketch,
            noise3DSketch: noise3DSketch,
        }

        this.state.noiseGenerator.setNoiseSeed(this.state.seedValue)

        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.computeNoises()
    }

    onUpdate() {
    // componentDidUpdate() {
        this.computeNoises()
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value})
        this.computeNoises()
    }

    computeNoises() {
        this.state.noiseGenerator.setNoiseSeed(this.state.seedValue)
        this.state.noiseGenerator.setPerlinNoiseDetail(this.state.lodValue, this.state.falloffValue)
    }
    
    rgbToHex(value) { 
        const rgbValue = Math.round(value * 255)
        let hex = Number(rgbValue).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return "#" + hex + hex + hex;
    }
    
    styleForCell(hexValue) {
        return {
            display: 'inline-block',
            width: '10px',
            height: '10px',
            // margin: '0px',
            // padding: '0px',
            backgroundColor: this.rgbToHex(hexValue),
        }
    }

    render() {
        
        return(
            <div className="container-fluid">
                <h1>Fractal Brownian Motion</h1>

                <div className="row">
                    <div className="col s3 left-form">

                        <div className="card-panel grey lighten-4">
                            <label>
                                scale ({this.state.scaleValue}) :
                                <input type="range" name="scaleValue" 
                                value={this.state.scaleValue} onChange={this.handleChange}
                                min="0.01" max="1" step="0.01" />
                            </label>
                            <label>
                                divisions ({this.state.divisionValue}) :
                                <input type="range" name="divisionValue" 
                                value={this.state.divisionValue} onChange={this.handleChange}
                                min="2" max="128" step="1" />
                            </label>
                            {/* <label>
                                Offset ({this.state.offsetValue}) :
                                <input type="range" name="offsetValue" 
                                value={this.state.offsetValue} onChange={this.handleChange}
                                min="-1" max="1" step="0.01" />
                            </label> */}
                        </div>

                        <div className="card-panel grey lighten-4">
                            <label>
                                Seed :
                                <input type="text" value={this.state.seedValue} onChange={this.handleChange} name="seedValue"></input>
                                {/* <input type="number" value={this.state.seedValue} onChange={this.handleChange} name="seedValue"></input> */}
                            </label>
                            <label>
                                lod ({this.state.lodValue}) :
                                <input type="range" name="lodValue" 
                                value={this.state.lodValue} onChange={this.handleChange}
                                min="1" max="8" step="1" />
                            </label>
                            <label>
                                falloff ({this.state.falloffValue}) :
                                <input type="range" name="falloffValue" 
                                value={this.state.falloffValue} onChange={this.handleChange}
                                min="0.01" max="1" step="0.01" />
                            </label>
                            {/* <button>Generate</button> */}
                        </div>
                    </div>

                    <div className="col s9">
                        <h3>Determined Random</h3>
                        <code>getPerlinNoise()</code>
                        {this.state.noiseGenerator.getPerlinNoise()}<br/>
                        <code>getPerlinNoise(1)</code>
                        {this.state.noiseGenerator.getPerlinNoise(1)}<br/>
                        <code>getPerlinNoise(1, 2)</code>
                        {this.state.noiseGenerator.getPerlinNoise(1, 2)}<br/>
                        <code>getPerlinNoise(1, 2, 3)</code>
                        {this.state.noiseGenerator.getPerlinNoise(1, 2, 3)}<br/>
                        <code>getPerlinNoise(45.7098)</code>
                        {this.state.noiseGenerator.getPerlinNoise(45.7098)}<br/>
                        <code>getPerlinNoise(-45.7098)</code>
                        {this.state.noiseGenerator.getPerlinNoise(-45.7098)}<br/>
                        <code>getPerlinNoise("lol")</code>
                        {this.state.noiseGenerator.getPerlinNoise("lol")}<br/>
        
                        {/* <h3>1D noise</h3>
                        <P5 sketch={this.state.noise1DSketch}
                            data={{
                                offsetValue: this.state.offsetValue,
                                noiseScaleValue: this.state.scaleValue,
                                divisionValue: this.state.divisionValue,
                                getNoise: (x,y,z) => this.state.noiseGenerator.getPerlinNoise(x,y,z)
                            }}
                        />
                        <h3>2D noise</h3>
                        <P5 sketch={this.state.noise2DSketch} 
                            data={{
                                offsetValue: this.state.offsetValue,
                                noiseScaleValue: this.state.scaleValue,
                                divisionValue: this.state.divisionValue,
                                getNoise: (x,y,z) => this.state.noiseGenerator.getPerlinNoise(x,y,z)
                            }}
                        />
                        <h3>2D noise in 3D</h3>
                        <P5 sketch={this.state.noise3DSketch} 
                            data={{
                                offsetValue: this.state.offsetValue,
                                noiseScaleValue: this.state.scaleValue,
                                divisionValue: this.state.divisionValue,
                                getNoise: (x,y,z) => this.state.noiseGenerator.getPerlinNoise(x,y,z)
                            }}
                        /> */}
                    </div>
                </div>

            </div>
        )
    }
}

export default FBM