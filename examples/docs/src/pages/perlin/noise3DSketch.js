export default (p5) => {
    let canvas = null
    const scale = 0.2
    const noiseHeight = 100

    let prevData = null

    let mesh = null

    class Mesh {
        constructor() {
            this.verteces = []
        }

        // TO DO ( éviter la répétition dans la fonction init() )
        makeVertexForAFace(x,y,z){

            // const h1 = p5.createVector(0,0,0);
            // const h2 = p5.createVector(x,y,z);
            // const hypo = h1.dist(h2);

            // let scalar = farestVertex/hypo;
            let newVector = p5.createVector(x,y,z);
            // newVector = newVector.mult(scalar);

            return newVector;
        }

        init(size, resolution){

            const v1 = p5.createVector(0,0,0);
            const v2 = p5.createVector(size/2,size/2,size/2);
            const farestVertex = v1.dist(v2);

            // const originVertex = p5.createVector(-size/2,-size/2,size/2);
            const sliceSize = size/(resolution-1);
            for(let x=0; x<(resolution-1); x++) {
                for(let y=0; y<(resolution-1); y++) {

                    const ax = x*sliceSize;
                    const ay = y*sliceSize;
                    const az = p5.data.getNoise(x * p5.data.noiseScaleValue * scale, y * p5.data.noiseScaleValue * scale) * noiseHeight - (noiseHeight / 2);
                    // const az = -noiseHeight / 2
                    this.verteces.push(this.makeVertexForAFace(ax,ay,az));
                    const bx = (x+1)*sliceSize;
                    const by = (y+1)*sliceSize;
                    const bz = p5.data.getNoise((x + 1) * p5.data.noiseScaleValue * scale, (y + 1) * p5.data.noiseScaleValue * scale) * noiseHeight - (noiseHeight / 2);
                    // const bz = -noiseHeight / 2
                    this.verteces.push(this.makeVertexForAFace(bx,by,bz));
                    const cx = x*sliceSize;
                    const cy = (y+1)*sliceSize;
                    const cz = p5.data.getNoise(x * p5.data.noiseScaleValue * scale, (y + 1) * p5.data.noiseScaleValue * scale) * noiseHeight - (noiseHeight / 2);
                    // const cz = -noiseHeight / 2
                    this.verteces.push(this.makeVertexForAFace(cx,cy,cz));
                    const dx = x*sliceSize;
                    const dy = y*sliceSize;
                    const dz = p5.data.getNoise(x * p5.data.noiseScaleValue * scale, y * p5.data.noiseScaleValue * scale) * noiseHeight - (noiseHeight / 2);
                    // const dz = -noiseHeight / 2
                    this.verteces.push(this.makeVertexForAFace(dx,dy,dz));
                    const ex = (x+1)*sliceSize;
                    const ey = y*sliceSize;
                    const ez = p5.data.getNoise((x + 1) * p5.data.noiseScaleValue * scale, y * p5.data.noiseScaleValue * scale) * noiseHeight - (noiseHeight / 2);
                    // const ez = -noiseHeight / 2
                    this.verteces.push(this.makeVertexForAFace(ex,ey,ez));
                    const fx = (x+1)*sliceSize;
                    const fy = (y+1)*sliceSize;
                    const fz = p5.data.getNoise((x + 1) * p5.data.noiseScaleValue * scale, (y + 1) * p5.data.noiseScaleValue * scale) * noiseHeight - (noiseHeight / 2);
                    // const fz = -noiseHeight / 2
                    this.verteces.push(this.makeVertexForAFace(fx,fy,fz));
                }
            }

        }

        draw() {

            // p5.fill(200);
            p5.stroke(0);
            // p5.noStroke();

            // p5.noFill();
            // p5.stroke(255);

            // p5.noStroke();
            // p5.normalMaterial();
            
            p5.push();

            const sliceSize = p5.width/2/(p5.data.divisionValue-1);

            for(let i=0;i<this.verteces.length;i+=3){
                const vert_A = this.verteces[i];
                const vert_B = this.verteces[i+1];
                const vert_C = this.verteces[i+2];

                p5.beginShape();
                p5.vertex(vert_A.x,vert_A.y,vert_A.z);
                p5.vertex(vert_B.x,vert_B.y,vert_B.z);
                p5.vertex(vert_C.x,vert_C.y,vert_C.z);
                p5.endShape(p5.CLOSE);
            }

            p5.pop();

        }
    }

    p5.setup = function() {
        canvas = p5.createCanvas(0,0, p5.WEBGL)
        resizeCanvas()
        initMesh()
        // drawFrame()
    }

    function initMesh() {
        mesh = new Mesh()
        // mesh.init(p5.width/2, Math.floor(Math.sqrt(p5.data.divisionValue)) + 2)
        mesh.init(p5.width/2, p5.data.divisionValue / 2)
    }
  
    p5.draw = function() {
        if(p5.data && p5.data !== prevData) {
            initMesh()
            drawFrame()
            prevData = p5.data
        }
 
        // p5.rotateY(p5.TWO_PI / p5.millis() * 10000)
        // drawFrame()
    }

    function drawFrame() {

        p5.background(51)

        p5.rotateX(p5.PI / 3)
        p5.translate(-p5.width/2/2, -p5.width/2/2, 0)
        // p5.translate(-p5.width/2/2, -p5.width/2/2, p5.height/2/2/2)

        mesh.draw()

        // const rectSize = p5.width / p5.data.divisionValue

        // p5.noStroke()
        // for (var x = 0; x < p5.width; x += rectSize) {
        //     for (var y = 0; y < p5.height; y += rectSize) {
        //       p5.fill(p5.data.getNoise(x * p5.data.noiseScaleValue * scale, y * p5.data.noiseScaleValue * scale) * 255 + p5.data.offsetValue * 255)
        //       p5.rect(x, y, rectSize, rectSize)
        //     }
        // }
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