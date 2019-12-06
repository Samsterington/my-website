// ---- A list of really simple functions ---- //

// If chance is set to 2 there is a fifty percent chance of it returning true, set to 3 it is 33 percent.
function chanceOutOf(chance) {
    return floor(random(0,chance)) === 0;
}

// this creates a random x y position on the edge of the screen
function xyOnEdge(size) {
    let x;
    let y;
    if(chanceOutOf(4)) {
        y = -size/2;
        x = random(0,width);
    } else if (chanceOutOf(3)) {
        y = height + size/2;
        x = random(0,width);
    } else if (chanceOutOf(2)){
        y = random(0,height);
        x = -size/2;
    } else {
        y = random(0,height);
        x = width + size/2;
    }
    return {
        x,
        y
    }
}