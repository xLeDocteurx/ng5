import React, {Component} from 'react'
import p5 from 'p5'
// import '../../p5/addons/p5.sound.js'

class P5Wrapper extends Component {

    constructor(props) {
        super(props)

        this.state = {
            canvas: null,
            // canvas: new p5(this.props.sketch, this.el),
        }

        this.doesComponentReceivedData = this.doesComponentReceivedData.bind(this)
    }

    componentDidMount() {
        this.setState({canvas: new p5(this.props.sketch, this.el)})
        // const canvasAndData = {...new p5(this.props.sketch, this.el), data: this.props.data}
        // this.setState({canvas: canvasAndData})

        // this.doesComponentReceivedData()
    }

    componentDidUpdate() {
        this.doesComponentReceivedData()
        // this.forceUpdate()
    }

    doesComponentReceivedData() {
        this.state.canvas.data = this.props.data ? this.props.data : null

        // const dataObject = {data: this.props.data}

        // // this.setState((prevState) => ({
        // //     canvas: Object.assign({}, prevState.canvas, dataObject)
        // // }))
        
        // // console.log('this.state.canvas', this.state.canvas)
        // this.setState((prevState) => ({
        //     canvas: {
        //         ...prevState.canvas,
        //         ...dataObject
        //     }
        // }))
        // // console.log('this.state.canvas', this.state.canvas)
    }

    render() {
        return (
            <div className="sketch" ref={(el) => {this.el = el}}></div>
        )
    }
}

export default P5Wrapper