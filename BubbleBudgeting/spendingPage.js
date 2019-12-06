// Spending page

function drawSpendingPage() {
    background(198,226,255);
    
    //Copyright text
    textSize(16);
    fill(0);
    text('PAPA-AJ ®',width-50,height-10)
    
    translate(translateX,translateY);
    image(img,20-translateX,20-translateY,250,250);
    
    
    
    // Drawing the bubbles and allow their interactions
    let budget =0;
    let angles = positioning(spendingArray);
    angles = angles.map(x => x + shift);
    shiftI = map(mouseX,0,width,-0.3,0.3)
    shift += shiftI;
    for (let i = 0; i < spendingArray.length; i++) {
        budget += spendingArray[i].amount;
        let place = drawBubble(spendingArray[i].amount,angles[i],spendingArray[i].colour);
         if (savingExist && spendingArray[i].saving != undefined) {
            let value = spendingArray[i].amount - spendingArray[i].saving;
            drawSavingCircles(value,place[0],place[1]);
        }
        if(isOnCircle(place[0],place[1],place[2])) {
            displayIt(spendingArray[i].name,spendingArray[i].amount,spendingArray[i].saving,place[0],place[1]);
        }
    }
    center();
    
    // Drawing saving object
    if (savingExist) {
        drawSavingBox();
    }
    
    // The buttons
    if (displaySBP) {
        drawBlock(300,225,20,height-225-20);
        if (initiate) {
            domSBP();
            initiate = false;
        }
    } else if (displaySaBP) {
        drawBlock(300,225,20,height-225-20);
            if (initiate) {
                domSaBP();
                initiate = false;
            }
    } else {
        spendingButton(xSB , ySB);
        hoverSB = isOnRect(xSB,ySB,sizeSB,sizeSB);
        
        let xSaB = xSB + 120;
        savingButton(xSaB,ySB);
        hoverSaB = isOnRect(xSaB,ySB,sizeSB,sizeSB);
    }
    
}