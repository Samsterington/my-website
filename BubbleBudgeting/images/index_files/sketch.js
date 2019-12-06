let song;
let songIsPlaying = false;
let frame;

// Arrays of objects used in the MVG
let arrayOf = {
    pulseBalls: [],
    colourPoints: [],
}


function preload() {
    soundFormats('mp3', 'ogg');
    song = loadSound('../Music/TheTop.mp3');
}

function setup() {
    frameRate(40);
    createCanvas(windowWidth,windowHeight);
    song.setVolume(0.3);
    background(0);
    textAlign(CENTER);
    rectMode(CENTER);
}

function draw() {
    frame++;
    countDownTime();
    pulsingBallsTime();
    colourPointsTime();
}



function keyPressed() {
    // Press enter to start the code
    if(keyCode === 13 && !songIsPlaying) {
        songIsPlaying = true;
        song.play();
        frame = 0;
    }
    // Press up to log frame number
    if(keyCode === 38 && songIsPlaying) {
        console.log(frame);
    }
    
    // Press sapcebar to pause the song (permanantly)
    if(keyCode === 32 && songIsPlaying) {
        song.pause();
    }
}


// Would be fun to creat some balls and if you float over one the colour scheme changes

function colourPointsTime() {
    let start = 511;
    if (frame === start) {
        arrayOf.colourPoints = createColourPoints();
    }
    if (frame >= start) {
        updateColourPoints();
    }
}

function createColourPoints() {
    let number = 5; // this is the number of colour points created
    let points = []
    for(let i = 0; i <= 5; i++) {
        points[i] = new ColourPoint(random(0,width),random(0,height));
    }
    return points;
}

function updateColourPoints() {
    for(let i = 0; i < arrayOf.colourPoints.length; i++) {
        arrayOf.colourPoints[i].display;
    }
}


class ColourPoint {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.colour = color(random(0,255),random(0,255),random(0,255));
    }
    
    display() {
//        fill(this.colour);
        ellipse(this.x,this.y,this.size)
    }
}
















