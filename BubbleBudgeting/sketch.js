let spendingArray = [];
let spendingAreas = ['Rent', 'Travel', 'Bills', 'Food', 'Gifts', 'Movies', 'Eating Out'];
let radius = 260;
let time = 0.00;
let translateX;
let translateY;
let initiate = false;

// Dynamics 
let shift = 0;
let shiftI = 0.2;

// Dom element available variables
let input1;
let input2;
let input3;
let select1;
let submit1;
let submit2;

// spendingButton and page
let xSB;
let ySB;
let curveSB = 10;
let sizeSB = 100;
let hoverSB = false;
let displaySBP = false;

// savingButton and page
let savingExist = false;
let hoverSaB = false;
let displaySaBP = false;
let savingObject = {
    name: undefined,
    cost: undefined,
    monthlySaving: undefined,
    totalSaved: undefined,
    monthsToSave: undefined,
}

function preload() {

    img = loadImage('images/logo.png');
}


function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    textAlign(CENTER);
    rectMode(CENTER);
    frameRate(40);
    translateX = width / 2.1;
    translateY = height / 2;

    createBasicData();

    // Positions the spending button and basis for other buttons
    xSB = -translateX + 70;
    ySB = -translateY - 70 + height;

}

function draw() {
    drawSpendingPage();
}

//-------------------------------------------Setting up----------------------------------------------//

function createBasicData() {
    let colour;
    let amount;
    for (let i = 0; i < 6; i++) {
        if (i == 0) {
            colour = 3;
            amount = floor(random(100, 200));
        } else if (i < 3) {
            colour = 2;
            amount = floor(random(40, 120));
        } else if (i < 4) {
            colour = 1;
            amount = floor(random(50, 200));
        } else {
            colour = floor(random(0, 2));
            amount = floor(random(20, 100));
        }
        spendingArray[i] = {
            name: spendingAreas[i],
            amount: amount,
            colour: colour,
            saving: undefined,
            saved: false,
            goalAmount: undefined
        }
    }
}

//--------------------------------------------------------------------------------------------------------//

// Takes a polar coordinate and turns it into a cartesian one
function polar2cart(r, theta) {
    let place = [];
    theta = toRadians(theta);
    place[0] = r * cos(theta);
    place[1] = r * sin(theta);
    return place;
}

// Converts degrees tio radians to allow us to work with the computers trigonoemtry fucntions 
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

// To calculate sizing factor you have to work out the maximum size a bubble can be.
function calculateSizingFactor() {
    let max = 0; // second number for index value
    for (let i = 0; i < spendingArray.length; i++) {
        if (spendingArray[i].amount > max) {
            max = spendingArray[i].amount;
        }
    }
    let sizingFactor = radius * 2 * sin(toRadians(360 / spendingArray.length) / 2) / max;
    return sizingFactor;
}

// works out the size of your bubbles using the amount and the global sizing factor
function bubbleSize(amount) {
    return amount * calculateSizingFactor();
}

// Basically splits the amount of bubbles equally over 360 degrees and returns each angle position in an array.
function positioning(array) {
    let angles = []
    let angle = 360 / array.length;
    for (let i = 1; i <= array.length; i++) {
        angles[i - 1] = i * angle;
    }
    return angles;
}

// Turns 0-3 into colours green to red
function giveColour(value) {
    if (value == 0) {
        return color(193, 240, 246);
    } else if (value == 1) {
        return color(99, 209, 244);
    } else if (value == 2) {
        return color(80, 166, 194);
    } else if (value == 3) {
        return color(0, 104, 139);
    } else {
        return 0;
    }
}

// Draws the bubble at the position and with the correct colour 
function drawBubble(value, angle, colour) {
    let place = polar2cart(radius, angle);

    strokeWeight(4);
    line(place[0], place[1], 0, 0);

    strokeWeight(2);
    fill(giveColour(colour));
    place[2] = bubbleSize(value);
    ellipse(place[0], place[1], place[2]);

    return place;
}

function center() {
    fill(255);
    strokeWeight(4);
    ellipse(0, 0, 200);
    let budget = 0;
    for (let i = 0; i < spendingArray.length; i++) {
        budget += spendingArray[i].amount;
    }
    fill(0);
    textSize(20)
    text('Monthly spending', 0, -15);
    textSize(50)
    text('£' + budget, 0, 38)
    //    image(img,-85,-78,170,170);

}

//------------Display spending amounts -----------------//

// Draw saving circles

function drawSavingCircles(value, x, y) {
    let size = bubbleSize(value);
    fill(200, 100);
    strokeWeight(2);
    ellipse(x, y, size);
}


// Checks to see if your mouse is on the a bubble
function isOnCircle(x, y, size) {
    let distance = dist(mouseX, mouseY, x + translateX, y + translateY);
    if (distance < size / 2) {
        return true;
    } else {
        return false;
    }
}

// Displays the names and amounts of bubbles on your coding
function displayIt(name, amount, saving, x, y) {
    fill(255);
    strokeWeight(3);
    textSize(20)
    if (saving != undefined) {
        amount = ceil(amount);
        saving = ceil(saving);
        rect(x, y, 320, 50, 20);
        fill(0);
        let saved = amount - saving;
        text(name + ": £" + amount + ' - ' + '£' + saving + ' = £' + saved, x, y + 8);
    } else {
        amount = ceil(amount);
        rect(x, y, 220, 50, 20);
        fill(0);
        text(name + ": £" + amount, x, y + 8);
    }

}

// -------- display saving amounts -------------- //

function drawSavingBox() {
    // Outline
    let length = 400;
    let depth = 180;
    let xPos = width - length - 20 - translateX;
    let yPos = 20 - translateY;
    drawBlock(length, depth, xPos + translateX, yPos + translateY);
    let bar = 80 - translateY;
    strokeWeight(3);
    line(xPos, bar, xPos + length, bar);
    line(xPos + length / 2, bar, xPos + length / 2, depth - translateY + 20);
    line(xPos + length / 2, bar + depth / 4 + 10, xPos + length, bar + depth / 4 + 10);

    // Text 
    fill(0);
    textSize(30);
    text('Goal: ' + savingObject.name, xPos + length / 2, yPos + 43);
    textSize(36);
    text('£' + savingObject.cost, xPos + length / 4, yPos + 115);
    textSize(24);
    text(savingObject.monthsToSave + ' months', xPos + length / 4, yPos + 150);
    textSize(20);
    text('£' + savingObject.monthlySaving + '/month', xPos + length * 0.75, yPos + 98);
    text('£' + savingObject.totalSaved + ' saved so far!', xPos + length * 0.75, yPos + 155)

}

//------- ADD SPENDING ----------//

function spendingButton(x, y) {
    // Outline 
    if (hoverSB) {
        fill(193, 240, 246);
    } else {
        fill(255);
    }
    rect(x, y, sizeSB, sizeSB, curveSB);
    strokeWeight(10);
    line(x - sizeSB / 2 + 20, y, x + sizeSB / 2 - 20, y);
    line(x, y - sizeSB / 2 + 20, x, y + sizeSB / 2 - 20);
}

// This displays the dom elements of the spending button page
// It must be initiated
function domSBP() {
    // Add class of spending
    input1 = createInput('');
    input1.position(50, 50 + height - 270);
    input1.attribute('placeholder', 'Add name of spending type');
    input1.addClass('inputSBP');

    // Add amount
    input2 = createInput('');
    input2.position(50, 100 + height - 270);
    input2.attribute('placeholder', 'Monthly spending');
    input2.attribute('type', 'number');
    input2.addClass('inputSBP');

    // Change how vital the spending is
    select1 = createSelect('')
    select1.position(50, 150 + height - 270);
    select1.addClass('inputSBP');
    select1.option('I don\'t really need to spend this')
    select1.option('I can reduce this a little')
    select1.option('I can only reduce this a bit')
    select1.option('I cannot reduce this at all')

    // Add submit button
    submit1 = createButton('Add spending');
    submit1.position(50, 190 + height - 270);
    submit1.addClass('buttonSBP');
    submit1.mousePressed(addSpending);

    submit2 = createButton('Cancel');
    submit2.position(210, 190 + height - 270);
    submit2.addClass('cancelSBP');
    submit2.mousePressed(exitFrom);
}

// This removes all dom elements and exits froms button displays 
function exitFrom() {
    displaySBP = false;
    displaySaBP = false;
    removeElements();
}

function addSpending() {
    let amount = +input2.value();
    if (!isNaN(amount) && amount != 0) {
        let colourNum;
        if (select1.value() === 'I don\'t really need to spend this') {
            colourNum = 0;
        } else if (select1.value() === 'I can reduce this a little') {
            colourNum = 1;
        } else if (select1.value() === 'I can only reduce this a bit') {
            colourNum = 2;
        } else if (select1.value() === 'I cannot reduce this at all') {
            colourNum = 3;
        }
        spendingArray.push({
            name: input1.value(),
            amount: +input2.value(),
            colour: colourNum,
            saving: undefined,
            saved: false,
            goalAmount: undefined
        })
    } else {
        alert('You did not enter a valid number for the amount that you spent');
    }
    exitFrom();
}

//------------GO TO SAVING PAGE------------------//

function savingButton(x, y) {
    if (hoverSaB) {
        fill(193, 240, 246)
    } else {
        fill(255);
    }
    strokeWeight(4);
    rect(x, y, sizeSB, sizeSB, curveSB);
    textSize(90);
    fill(0);
    text("S", x, y + 32);
}

function domSaBP() {
    // Add class of spending
    input1 = createInput('');
    input1.position(50, 50 + height - 270);
    input1.attribute('placeholder', 'What are you saving for?');
    input1.addClass('inputSBP');

    // Add amount
    input2 = createInput('');
    input2.position(50, 150 + height - 270);
    input2.attribute('placeholder', 'How many months of saving?');
    input2.attribute('type', 'number');
    input2.addClass('inputSBP');

    // Add amount
    input3 = createInput('');
    input3.position(50, 100 + height - 270);
    input3.attribute('placeholder', 'How much does it cost? (£)');
    input3.attribute('type', 'number');
    input3.addClass('inputSBP');

    // Add submit button
    submit1 = createButton('Add saving');
    submit1.position(50, 200 + height - 270);
    submit1.addClass('buttonSBP');
    submit1.mousePressed(addSaving);

    submit2 = createButton('Cancel');
    submit2.position(210, 200 + height - 270);
    submit2.addClass('cancelSBP');
    submit2.mousePressed(exitFrom);
}

function addSaving() {
    exitFrom();
    calculateSaving();
}

function createSavingObject() {
    savingObject.name = input1.value();
    savingObject.cost = input3.value();
    savingObject.monthsToSave = input2.value();
    savingObject.monthlySaving = ceil(input3.value() / input2.value());
    savingObject.totalSaved = 0;
    savingExist = true;
}

function calculateSaving() {
    // Check how far through the spendings we're going to need to go to get through the savings 
    let exceeded = false;
    let total = ceil(input3.value() / input2.value());
    let cumulative = 0;
    let startLevel = -1;
    let colourCount = [0, 0, 0, 0];
    let remainder = total;
    let failed = false;
    while (!exceeded) {
        startLevel++;
        for (let i = 0; i < spendingArray.length; i++) {
            if (spendingArray[i].colour == startLevel) {
                cumulative += spendingArray[i].amount / (startLevel + 2); // this is what would be needed to change if green should all be used up
                colourCount[startLevel]++;
            }
        }
        if (cumulative > total) {
            exceeded = true;
        } else if (startLevel > 3) {
            exceeded = true;
            failed = true;
            alert('This is two expensive to save for! Consider increasing your timescale for saving.')
        } else {
            remainder = total - cumulative;
        }
    }

    if (!failed) {
        createSavingObject();
        for (let i = 0; i <= startLevel; i++) {
            for (let j = 0; j < spendingArray.length; j++) {
                if (spendingArray[j].colour == i) {
                    if (i != startLevel) {
                        spendingArray[j].saving = spendingArray[j].amount / (i + 2); // and this down here
                    } else {
                        spendingArray[j].saving = remainder / colourCount[i];
                    }
                }
            }
        }
    }
}


// -------THE MOUSE CLICKED ----------------//
function mouseClicked() {
    if (hoverSB && !displaySBP) {
        displaySBP = true;
        initiate = true;
    }
    if (hoverSaB && !displaySaBP) {
        displaySaBP = true;
        initiate = true;
    }
}
//------------ GENERAL USAGE --------------//

// Cheks to see if your mouse is on a Rect (with RectMode(CENTER))
function isOnRect(x, y, length, depth) {
    if (mouseX > x - length / 2 + translateX && mouseX < x + length / 2 + translateX && mouseY > y - depth / 2 + translateY && mouseY < y + depth / 2 + translateY) {
        return true;
    } else {
        return false;
    }
}

// Checks to see if your mouse is on the a circle
function isOnCircle(x, y, size) {
    let distance = dist(mouseX, mouseY, x + translateX, y + translateY);
    if (distance < size / 2) {
        return true;
    } else {
        return false;
    }
}

// This function is going to allow to create a space to put content (like add spending)
function drawBlock(length, depth, positionX, positionY) {
    strokeWeight(5);
    fill(255);
    rect(positionX + (length / 2) - translateX, positionY + (depth / 2) - translateY, length, depth, 10);
}