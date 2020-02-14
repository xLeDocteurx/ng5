import React, {Component, Fragment} from 'react'
// import PNG5 from 'png5'
import PNG5 from '../../dist/index'

import P5 from '../../wrappers/P5Wrapper'
import flowSketch from './flowSketch'

class White extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            noiseGenerator: new PNG5(),

            startSimulation: false,
            
            showNoise: false,
            noiseScaleValue: 0.15,
            timeScaleValue: 5000,
            noiseAppCoefValue: 1,

            showParticles: true,
            particlesNumberValue: 150,
            particlesStrokeColorValue: '#00FFFF',
            // particlesStrokeColorValue: '#000000',
            particlesStrokeWeightValue: 1,
            particlesMaxSpeedValue: 1,
            // divisionValue: 64,

            seedValue: 'seed',
            // lodValue: 4,
            // falloffValue: 0.5,

            alphaValue: 4,
            
            flowSketch: flowSketch,
        }

        // this.state.noiseGenerator.setNoiseSeed(this.state.seedValue)

        this.handleStart = this.handleStart.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    }

    componentDidMount() {
        this.computeNoises()
    }

    onUpdate() {
    // componentDidUpdate() {
        this.computeNoises()
    }

    handleStart() {
        this.setState({startSimulation: !this.state.startSimulation})
    }

    handleChange(event) {
        const {name, value} = event.target
        this.setState({[name]: value})
        this.computeNoises()
    }

    handleCheckboxChange(event) {
        const {name} = event.target
        this.setState({[name]: !this.state[name]})
        // this.computeNoises()
    }

    computeNoises() {
        this.state.noiseGenerator.setNoiseSeed(this.state.seedValue)
        // this.state.noiseGenerator.setPerlinNoiseDetail(this.state.lodValue, this.state.falloffValue)
    }

    trigger(callback) {
    	callback()
    }

    render() {
        
        return(
            <div className="container-fluid">
	            <h1>Flow Field</h1>
                <div className="row">
                    <div className="col s3 left-form">
                        <div className="card grey lighten-4">
                            <div className="card-content">
                                <div className="card-title">
                                    Noise
                                    <span className="toggle-switch switch">
                                        <label>
                                            Hide
                                            <input name="showNoise" type="checkbox" className="filled-in" onChange={this.handleCheckboxChange} defaultChecked={this.state.showNoise} />
                                            <span className="lever"></span>
                                            Show
                                        </label>
                                    </span>
                                </div>
                                {/* {this.state.showNoise ? ( */}
                                    <Fragment>
                                        <label>
                                            Seed :
                                            <input type="text" value={this.state.seedValue} onChange={this.handleChange} name="seedValue"></input>
                                            {/* <input type="number" value={this.state.seedValue} onChange={this.handleChange} name="seedValue"></input> */}
                                        </label>
                                        <label>
                                            noise time scale (millis() / {this.state.timeScaleValue}) :
                                            <input type="range" name="timeScaleValue" 
                                            value={this.state.timeScaleValue} onChange={this.handleChange}
                                            min="250" max="10000" step="1" />
                                        </label>
                                        <label>
                                            noise scale ({this.state.noiseScaleValue}) :
                                            <input type="range" name="noiseScaleValue" 
                                            value={this.state.noiseScaleValue} onChange={this.handleChange}
                                            min="0.01" max="1" step="0.01" />
                                        </label>
                                        {/* <label>
                                            noise app coef ({this.state.noiseAppCoefValue}) :
                                            <input type="range" name="noiseAppCoefValue" 
                                            value={this.state.noiseAppCoefValue} onChange={this.handleChange}
                                            min="0.01" max="1" step="0.01" />
                                        </label> */}
                                    </Fragment>
                                {/* }) : null} */}
                            </div>
                        </div>

                        <div className="card grey lighten-4">
                            <div className="card-content">
                                <div className="card-title">
                                    Particles
                                </div>
                                {/* {this.state.showParticles ? ( */}
                                    <Fragment>
                                        <label>
                                            particles number ({this.state.particlesNumberValue}) :
                                            <input type="range" name="particlesNumberValue" 
                                            value={this.state.particlesNumberValue} onChange={this.handleChange}
                                            min="1" max="500" step="1" />
                                        </label>
                                        <label>
                                            particles stroke color ({this.state.particlesStrokeColorValue}) :
                                            <input type="color" name="particlesStrokeColorValue" 
                                            value={this.state.particlesStrokeColorValue} onChange={this.handleChange}
                                            min="1" max="10" step="1" />
                                        </label><br/>
                                        <label>
                                            Alpha ({this.state.alphaValue}) :
                                            <input type="range" name="alphaValue" 
                                            value={this.state.alphaValue} onChange={this.handleChange}
                                            min="0" max="255" step="0.1" />
                                        </label>
                                        <label>
                                            particles stroke weight ({this.state.particlesStrokeWeightValue}) :
                                            <input type="range" name="particlesStrokeWeightValue" 
                                            value={this.state.particlesStrokeWeightValue} onChange={this.handleChange}
                                            min="1" max="10" step="1" />
                                        </label>
                                        <label>
                                            particles max speed ({this.state.particlesMaxSpeedValue}) :
                                            <input type="range" name="particlesMaxSpeedValue" 
                                            value={this.state.particlesMaxSpeedValue} onChange={this.handleChange}
                                            min="0.01" max="20" step="0.01" />
                                        </label>
                                    </Fragment>
                                {/* }) : null} */}
                            </div>
                        </div>

                        {/* <div className="card grey lighten-4">
                            <div className="card-content">
                                <button onClick={this.handleStart}>Launch simulation</button>
                            </div>
                        </div> */}
                    </div>
    
                    <div className="col s9">
			            <P5 sketch={this.state.flowSketch}
			            data={{
			            	trigger: () => {this.trigger()},
                            startSimulation: this.state.startSimulation,
                            showNoise: this.state.showNoise,
			            	noiseScaleValue: this.state.noiseScaleValue,
                            timeScaleValue: this.state.timeScaleValue,
			            	noiseAppCoefValue: this.state.noiseAppCoefValue,
			            	particlesNumberValue: this.state.particlesNumberValue,
			            	particlesStrokeColorValue: this.state.particlesStrokeColorValue,
                            alphaValue: this.state.alphaValue,
			            	particlesStrokeWeightValue: this.state.particlesStrokeWeightValue,
                            particlesMaxSpeedValue: this.state.particlesMaxSpeedValue,
			            	random: (x, y) => this.state.noiseGenerator.getWhiteNoise(x, y), 
                            getNoise: (x,y,z) => this.state.noiseGenerator.getPerlinNoise(x,y,z)
			            }}
			            />
                    </div>
                </div>

            </div>
        )
    }
}

export default White