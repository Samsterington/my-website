// ---- Code for making the countdown ---- //

function countDownTime() {
    let start = 20;
    let beat = 19;
    for (let i = 1; i <= 8; i++) {
        if(frame > start + beat*(i-1) && frame < start + beat*i) {
            if (i != 7) {
                displayNumber(i);
            } else {
                displayNumber('F');
            }
        }
    } 
    if (frame === start + beat*8 + 1) {
        background(0);
        print(frame);
    }
}

function displayNumber(number) {
    fill(0);
    rect(width*0.5,height*0.5,500,1000);
    if (number != false) {
        textSize(800);
        fill(255);
        text(number,width*0.5,height*0.8); 
    }
}
// ---- End ---- //