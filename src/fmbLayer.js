import utils from './utils'

import NoiseGenerator from './noise'

class FbmEngine {
    constructor(props) {

        this.layers = props.layers ? props.layers : []
    }

    get octaves_number() {
        return this.layers.length
    }

    addFbmLayer(props) {
        const type = props.type ? props.type : 'random'
        const seed = props.seed ? props.seed : null
        const octaveFalloff = props.octaveFalloff ? props.octaveFalloff : 0.5

        this.layers.push(
            new NoiseGenerator({
                falloff: octaveFalloff,
                seed: seed
            })
        )
    }

    setFbmLayers(layerIndex, layer) {
        this.layers[layerIndex] = layer
    }

    editFbmLayer(layerIndex, layer) {
        this.layers[layerIndex].map((layer) => {
            for(prop of layer) {
                layer[prop] = prop.value
            }
        })

        // this.layers[layerIndex].reduce((previousValue, newValue) => {

        // })
    }

    removeFbmLayer(layerIndex) {
        this.layers = this.layers.splice(layerIndex, 1)
    }
}

export default FbmEngine