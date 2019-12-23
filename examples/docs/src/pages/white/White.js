import React, {Component} from 'react'
// import PNG5 from 'png5'
import PNG5 from '../../dist/index'

import P5 from '../../wrappers/P5Wrapper'
import noise1DSketch2 from './noise1DSketch2'
import noise2DSketch from './noise2DSketch'

class White extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            noiseGenerator: new PNG5(),
            
            // scaleValue: 1,
            scaleValue: 0.3,
            divisionValue: 64,
            offsetValue: 0,

            seedValue: 'seed',

            // lodValue: 4,
            // falloffValue: 0.5,
            
            noise1DSketch2: noise1DSketch2,
            noise2DSketch: noise2DSketch,
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

    render() {
        
        return(
            <div className="container-fluid">
                <h1>White Noise</h1>

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
                                min="2" max="192" step="1" />
                            </label>
                            <label>
                                Offset ({this.state.offsetValue}) :
                                <input type="range" name="offsetValue" 
                                value={this.state.offsetValue} onChange={this.handleChange}
                                min="-1" max="1" step="0.01" />
                            </label>
                        </div>

                        <div className="card-panel grey lighten-4">
                            <label>
                                Seed :
                                <input type="text" value={this.state.seedValue} onChange={this.handleChange} name="seedValue"></input>
                                {/* <input type="number" value={this.state.seedValue} onChange={this.handleChange} name="seedValue"></input> */}
                            </label>
                            {/* <button>Generate</button> */}
                        </div>
                    </div>
    
                    <div className="col s3"></div>
                    
                    <div className="col s9">
        
                        <h3>Determined Random</h3>
                        <code>getWhiteNoise(1)</code>
                        {this.state.noiseGenerator.getWhiteNoise(1)}<br/>
                        <code>getWhiteNoise(45.7098)</code>
                        {this.state.noiseGenerator.getWhiteNoise(45.7098)}<br/>
                        <code>getWhiteNoise(-45.7098)</code>
                        {this.state.noiseGenerator.getWhiteNoise(-45.7098)}<br/>
                        <code>getWhiteNoise("lol")</code>
                        {this.state.noiseGenerator.getWhiteNoise("lol")}<br/>
        
                        <h3>1D noise</h3>
                        <P5 sketch={this.state.noise1DSketch2}
                            data={{
                                offsetValue: this.state.offsetValue,
                                noiseScaleValue: this.state.scaleValue,
                                divisionValue: this.state.divisionValue,
                                getNoise: (x,y,z) => this.state.noiseGenerator.getWhiteNoise(x,y,z)
                            }}
                        />
                        <h3>2D noise</h3>
                        <P5 sketch={this.state.noise2DSketch} 
                            data={{
                                offsetValue: this.state.offsetValue,
                                noiseScaleValue: this.state.scaleValue,
                                divisionValue: this.state.divisionValue,
                                getNoise: (x,y,z) => this.state.noiseGenerator.getWhiteNoise(x,y,z)
                            }}
                        />
                        {/* <h3>3D noise</h3> */}
                    </div>
                </div>

            </div>
        )
    }
}

export default White