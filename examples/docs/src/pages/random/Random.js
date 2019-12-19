import React, {Component} from 'react'
// import PNG5 from 'png5'
import PNG5 from '../../dist/index'

class Random extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            noiseGenerator: new PNG5(),
            seedValue: 'seed',
        }

        this.state.noiseGenerator.setNoiseSeed(this.state.seedValue)
    }

    componentDidMount() {
        this.computeNoises()
    }

    computeNoises() {
        this.state.noiseGenerator.setNoiseSeed(this.state.seedValue)
    }
    
    render() {
        
        return(
            <div className="container-fluid">
                <h1>Random</h1>

                <div className="row">
                    <div className="col s3 left-form">

                    </div>
    
                    <div className="col s3"></div>
                    
                    <div className="col s9">
                        <h3>Undetermined Random</h3>
                        <code>random()</code>
                        {this.state.noiseGenerator.random()}<br/>
                        <code>random()</code>
                        {this.state.noiseGenerator.random()}<br/>
                        <code>random()</code>
                        {this.state.noiseGenerator.random()}<br/>
        
                        <h3>Determined Random</h3>
                        <code>random(1)</code>
                        {this.state.noiseGenerator.random(1)}<br/>
                        <code>random(45.7098)</code>
                        {this.state.noiseGenerator.random(45.7098)}<br/>
                        <code>random(-45.7098)</code>
                        {this.state.noiseGenerator.random(-45.7098)}<br/>
                        <code>random("lol")</code>
                        {this.state.noiseGenerator.random("lol")}<br/>
                    </div>
                </div>

            </div>
        )
    }
}

export default Random