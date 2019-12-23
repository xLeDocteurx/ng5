export default (p5) => {
    let canvas = null
    const scale = 0.05

    let prevData = null

    p5.setup = function() {
        canvas = p5.createCanvas(0,0)
        resizeCanvas()
        // drawFrame()
    }
  
    p5.draw = function() {
        if(p5.data && p5.data !== prevData) {
            drawFrame()
            prevData = p5.data            
        }
    }

    function drawFrame() {

        const rectSize = p5.width / p5.data.divisionValue

        p5.noStroke()
        for (var x = 0; x < p5.width; x += rectSize) {
            for (var y = 0; y < p5.height; y += rectSize) {
              p5.fill(p5.data.getNoise(x * p5.data.noiseScaleValue * scale, y * p5.data.noiseScaleValue * scale) * 255 + p5.data.offsetValue * 255)
              p5.rect(x, y, rectSize, rectSize)
            }
        }
    }

    p5.windowResized = function() {
        resizeCanvas()
        drawFrame()
    }
    function resizeCanvas() {
        const coef = 0.75
        const parentWidth = canvas.parent().clientWidth * coef
        const computedHeight = parentWidth * (9/16)
        p5.resizeCanvas(parentWidth, computedHeight)
    }
}