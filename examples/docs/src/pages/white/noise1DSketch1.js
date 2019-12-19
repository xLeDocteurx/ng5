export default (p5) => {
    let canvas = null
    const scale = 0.05
    // const scale = 1

    let prevData = null
    let noise = []

    p5.setup = function() {
        canvas = p5.createCanvas(0,0)
        resizeCanvas()
    }
  
    p5.draw = function() {
        if(p5.data && p5.data !== prevData) {
            drawFrame()
            prevData = p5.data            
        }
    }

    function drawFrame() {

        p5.background(51)

        if(p5.data) {

            p5.fill(255)

            for (let x = 0; x <= p5.width; x += p5.width/64) {
                const y = p5.map(1 - p5.data.random(), 0, 1, 0, p5.height)
                noise.push({x: x, y: y})
            }

            p5.beginShape()

            // noise.forEach((cell) => {
            //     p5.vertex(cell.x, cell.y)
            // })

            // console.log('p5.data.divisionValue', p5.data.divisionValue)
            // console.log('p5.width', p5.width)
            // console.log('p5.height', p5.height)
            // console.log('p5.width/p5.data.divisionValue', p5.width/p5.data.divisionValue)
            
            for (let x = 0; x <= p5.width; x += p5.width/p5.data.divisionValue) {
                
                // console.log('x * p5.width/p5.data.divisionValue', x * p5.width/p5.data.divisionValue)
                // console.log('Math.floor(x * p5.width/p5.data.divisionValue/64)', Math.floor(x * p5.width/p5.data.divisionValue/64))
                
                const y = noise[Math.floor(x * p5.width/p5.data.divisionValue/64)]
                
                // console.log('y', y)
                
                p5.vertex(x, y)
            }
            
            p5.vertex(p5.width, p5.height)
            p5.vertex(0, p5.height)
            p5.endShape(p5.CLOSE)

        }
    }

    function resizeCanvas() {
        const coef = 0.75
        const parentWidth = canvas.parent().clientWidth * coef
        const computedHeight = parentWidth * (9/16)
        p5.resizeCanvas(parentWidth, computedHeight)
    }
    p5.windowResized = function() {
        resizeCanvas()
    }
}