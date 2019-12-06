// ---- Moving in balls second (2nd and 3rd count of 8) ---- //

// This controls what and when the pulsing balls happen 
function pulsingBallsTime() {
    let start = 173
    if (frame === start) {
        arrayOf.pulseBalls = createPulsingBalls(); // Creating pulse balls produces the array of pulse balls and returns it, it then gets stored into a global variable. SHould move this into setup before the song starts to reduce computer power during the song.
    }
    if (frame >= start) {
        updatePulsingBalls();
    }
    
    
}

// Creates pulsing balls for the sequence
function createPulsingBalls() {
    let pulseBalls = [];
    let beats;
    let position;
    let size;
    
    // Snare pulse ball
    beats = [173,193,230,267,305,342,379,416,454];
    size = 70;
    position = xyOnEdge(size);
    pulseBalls[0] = new PulseBall(position.x,position.y,size,beats,true,1.3);
    
    // Base pulse ball
    beats = [173,182,210,219,258,266,286,295,323,333,360,369,407,417,435,445];
    size = 50;
    position = xyOnEdge(size);
    pulseBalls[1] = new PulseBall(position.x,position.y,size,beats,true,1.2);
    
    // Tappy pulse ball Need to work harder on the pusling of this ball
    beats = [183, 186, 197, 206, 211, 221, 224, 235, 244, 249, 259, 262, 273, 282, 287, 297, 300, 311, 320, 325, 335, 338, 349, 358, 363, 373, 376, 387, 396, 401, 411, 414, 425, 434, 439, 449, 452, 463, 472, 477];
//    let start = 173
//    for (let i = 0; i < 8; i++) {
//        let tempBeat = i*5;
//        start += 4.75*2;
//        beats[tempBeat] = Math.round(start);
//        tempBeat++;
//        start += 4.75;
//        beats[tempBeat] = Math.round(start);
//        tempBeat++;
//        start += 4.75*2;
//        beats[tempBeat] = Math.round(start);
//        tempBeat++;
//        start += 4.75*2;
//        beats[tempBeat] = Math.round(start);
//        tempBeat++;
//        start += 4.75;
//        beats[tempBeat] = Math.round(start);
//        tempBeat++;
//    }
//    console.log(beats);
    size = 30;
    position = xyOnEdge(size);
    pulseBalls[2] = new PulseBall(position.x,position.y,size,beats,false,1.1);
    
    return pulseBalls;
}

function updatePulsingBalls() {
//    background(0,50); // this makes the background getnly fade out the trails and it happens quicker later in the video. needs work on making it look better.
    for(let i = 0; i < arrayOf.pulseBalls.length; i++) {
        // All balls simply move towards the mouse
        if (frame < 473) {
            arrayOf.pulseBalls[i].move(mouseX,mouseY);
        } else {
        // Ball speed increases and balls follow each other
            if (arrayOf.pulseBalls[i].speed < 0.1) {
                arrayOf.pulseBalls[i].speed += 0.006;
            }
            if (i === 0) {
                arrayOf.pulseBalls[i].move(mouseX,mouseY);
            } else {
                arrayOf.pulseBalls[i].move(arrayOf.pulseBalls[i-1].x,arrayOf.pulseBalls[i-1].y);
            }
        }
        arrayOf.pulseBalls[i].pulse();
        arrayOf.pulseBalls[i].display(); 
    }
}

// A ball that pulses at certain intervals
class PulseBall {
    constructor(x,y,baseSize,beats,smooth,scale) {
        this.x = x;
        this.y = y;
        this.baseSize = this.size = baseSize; // Basic size of the ball
        this.beats = beats; // An array of beats to pulse on
        this.pulseScale = scale; // How big the pulse should be (2 equals double size pulsing)
        this.smooth = smooth; // False: snap to new ball size, true: half step to new ball size
        this.speed = 0.003;
        this.shade = 255;
    }
    
    // display the pulsing ball 
    display() {
        fill(this.shade);
        ellipse(this.x,this.y,this.size);
    }
    
    // move towards point x,y with a speed scaler
    move(x,y) {
        this.x -= (this.x - x)*this.speed;
        this.y -= (this.y - y)*this.speed;
    }
    
    
    // beats is an array of beats to pulse on
    pulse() {
        for (let i = 0; i < this.beats.length; i++){
            if (frame === this.beats[i]) {
                this.size = this.pulseScale*this.baseSize;
//                this.shade = 155;
                break;
            } else if (this.smooth && frame === this.beats[i] - 1 || frame === this.beats[i] + 1) {
                this.size = this.pulseScale*this.baseSize*0.75;
//                this.shade = 200;
                break;
            } else {
                this.size = this.baseSize;
//                this.shade = 255;
            }
        }
    }
        
}