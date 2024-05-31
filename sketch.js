
let branches;
let cloudVisible = true; // Variable to track if the cloud is visible// Flag to track if the color transition has started
let startColor, endColor; // Define start and end colors
let verticalOffset ; // Offset to adjust the y position of apple tree initially drawn by group
let sunXStart, sunYStart;
let prevSunX; 

function setup() {
  // Set the canvas size
  createCanvas(windowWidth, windowHeight);
  drawCanvas();
  // Define start and end colors
  startColor = color(135, 173, 128); 
  endColor = color(251, 88, 87); 

  // Initialise Sun position
  sunXStart = width * 0.1; 
  sunYStart = height * 0.1; 
}

function windowResized() {
  // Resize the canvas to the window's width and height
  resizeCanvas(windowWidth, windowHeight);
  drawCanvas();
}


function draw() {
  // Only update elements that change over time
  if (frameCount === 1) {
    drawCanvas();
  }


  //When frameCount >= 200, started rainning
  if (frameCount >= 200) {
    if (cloudVisible) {
      drawCloudAndRaindrops(width, height);
    }
  }

  //When frameCount equals 500, cloud invisible
  if (frameCount === 500) {
    cloudVisible = false;
    drawCanvas();
  
  }

   //When frameCount >500, sun coming
  if(frameCount>500){
    drawSun(width, height);
  }
 
  //When frameCount eqauls 600, apples on the tree
  if (frameCount === 600) {
    verticalOffset = height * 0.4;
    drawBottomRectangle(width, height * 0.8 + verticalOffset);
    drawApplesOnBranches(width, height * 0.8 + verticalOffset);
    branches.forEach(branch => {
      branch.drawBranch(); // Draw the branch
    });
  }

  //When frameCount eqauls 750, aplles started to be ripe
  if (frameCount === 750) {
    drawHalfRedHalfGreenApples();

    drawApplesOnBranches(width, height * 0.8 + verticalOffset);
    branches.forEach(branch => {
      branch.drawBranch(); // Draw the branch
    });
  }
  
  // Ripe apples to be all red when framecount is 900
  if (frameCount === 900) {
     drawRedApples();
     drawApplesOnBranches(width, height * 0.8 + verticalOffset);
     branches.forEach(branch => {
       branch.drawBranch(); // Draw the branch
     });
  }

   // Ripe apples to be all red when framecount is 900
   if (frameCount === 950) {
    drawCanvas();
   

    // Draw fallen apples
  for (let i = 0; i < 15; i++) {
    let circleX = random(width); 
    let circleY = random(height*0.85, height*0.88); 
    let circleSize = random(30, 80); 

    fill(251, 88, 87); 
    noStroke();
    ellipse(circleX, circleY, circleSize, circleSize); // draw apples
  }
 }

   

  
 
}

function drawCanvas() {
  let canvasWidth = width;
  let canvasHeight = height;

  // Set the background color
  background(146, 157, 155);
  noStroke();
  // Draw inner layer
  drawOilPainting(canvasWidth, canvasHeight);

  // Calculate a vertical offset to move the tree lower
  let verticalOffset = canvasHeight * 0.4;

  // Draw roots
  drawRoots(canvasWidth, canvasHeight * 0.8 + verticalOffset);
  // Draw bottom rectangle
  //drawBottomRectangle(canvasWidth, canvasHeight * 0.8 + verticalOffset);

  drawBranchesAndApples(canvasWidth, canvasHeight * 0.8 + verticalOffset);

  
}

  function drawRoots(canvasWidth, canvasHeight) {
  // Calculate and draw the roots rectangle
  let rootX = 16 / 464 * canvasWidth;
  let rootY = 490 / 649 * canvasHeight;
  let rootWidth = 430 / 464 * canvasWidth;
  let rootHeight = 40 / 649 * canvasHeight;
  fill(95, 142, 105);
  rect(rootX, rootY, rootWidth, rootHeight);
}

function drawOilPainting(w, h) {
    // Draw the rectangle for the oil painting
  fill(83, 96, 110);
  rect(18, 18, w - 36, h - 36);

  // Draw multiple bezier curves to create the oil painting effect
  noFill();
  for (let i = 0; i < 2600; i++) {
    let strokeWeightValue = random(0.36, 0.08);
    stroke(i % 3 === 0 ? 255 : 220, 230, 219);
    strokeWeight(strokeWeightValue);

    let x1 = random(36, w - 18);
    let y1 = random(36, h - 18);
    let x2 = x1 + random(-50, 50);
    let y2 = y1 + random(-50, 50);
    let cp1x = random(x1 + 10, x1 - 10);
    let cp1y = random(y1 + 10, y1 - 10);
    let cp2x = random(x2 - 10, x2 + 10);
    let cp2y = random(y2 - 10, y2 + 5);

    bezier(x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2);
  }

  // Draw multiple small ellipses to create the texture
  fill(46, 58, 73);
  noStroke();
  let xDots = (w-40)/5.5
  let yDots =  (h-40)/5.5
 for (let i = 0; i < xDots; i++) {
   for (let j = 0; j < yDots; j++) {
      ellipse(20 + i * 5.5, 20 + j * 5.5, 2, 2);
    }
  }
}

  // Draw the bottom rectangle
function drawBottomRectangle(canvasWidth, canvasHeight) {
  let rectX = canvasWidth * 120 / 464;
  let rectY = canvasHeight * 485 / 649;
  let rectW = canvasWidth * 220 / 464;
  let rectH = canvasHeight * 50 / 649;
  
  // Draw the bottom rectangle
  fill(46, 58, 73);
  stroke(0);
  strokeWeight(1);
  fill(230, 197, 116);
  rect(rectX, rectY, rectW, rectH);
  fill(251, 88, 87);
  rect(rectX, rectY, canvasWidth * 44 / 464, rectH);
  rect(rectX + canvasWidth * 160 / 464, rectY, canvasWidth * 44 / 464, rectH);
  fill(135, 173, 128);
  rect(rectX + canvasWidth * 70 / 464, rectY, canvasWidth * 44 / 464, rectH);
  // Draw apples on the bottom rectangle
  drawApplesOnRectangle(rectX, rectY, rectW, rectH);
}

function drawApplesOnRectangle(rectX, rectY, rectW, rectH) {
  // Add apples to the rectangle
  let apples = [];
  for (let i = 0; i < 6; i++) {
    let appleDiameter = 50;
    let apple = new Apple(appleDiameter);
    let attempts = 0, maxAttempts = 100;
    do {
      let randomX = random(rectX + appleDiameter / 2, rectX + rectW - appleDiameter / 2);
      apple.setPosition(randomX, rectY + rectH / 2);
      if (attempts++ > maxAttempts) {
        break;
     }
      } while (apples.some(a => applesOverlap(a, apple)));
      if (attempts <= maxAttempts) {
        apple.draw();
        apples.push(apple);
      }
    }
}


let specifiedBranch;

function drawBranchesAndApples(canvasWidth, canvasHeight) {

  let startY = canvasHeight * 0.15;

  // Draw branches and apples
   branches = [
    new Branch(85 / 464 * canvasWidth, startY +40 / 649 * canvasHeight, 90 / 464 * canvasWidth, startY+135 / 649 * canvasHeight),
    new Branch(90 / 464 * canvasWidth, startY +135 / 649 * canvasHeight, 125 / 464 * canvasWidth, startY+132 / 649 * canvasHeight),
    new Branch(125 / 464 * canvasWidth, startY +132 / 649 * canvasHeight, 123 / 464 * canvasWidth, startY+265 / 649 * canvasHeight),
    new Branch(123 / 464 * canvasWidth, startY +265 / 649 * canvasHeight, 330 / 464 * canvasWidth, startY+265 / 649 * canvasHeight),
    new Branch(330 / 464 * canvasWidth, startY +265 / 649 * canvasHeight, 328 / 464 * canvasWidth, startY+110 / 649 * canvasHeight),
    new Branch(328 / 464 * canvasWidth, startY +110 / 649 * canvasHeight, 400 / 464 * canvasWidth, startY+125 / 649 * canvasHeight),
    new Branch(232 / 464 * canvasWidth, startY+255 / 649 * canvasHeight, 232 / 464 * canvasWidth, startY+195 / 649 * canvasHeight),
    new Branch(160 / 464 * canvasWidth, startY+195 / 649 * canvasHeight, 275 / 464 * canvasWidth, startY+195 / 649 * canvasHeight),
    new Branch(180 / 464 * canvasWidth, startY+195 / 649 * canvasHeight, 180 / 464 * canvasWidth, startY+170 / 649 * canvasHeight),
    new Branch(275 / 464 * canvasWidth, startY+195 / 649 * canvasHeight, 275 / 464 * canvasWidth, startY+170 / 649 * canvasHeight),
    new Branch(232 / 464 * canvasWidth, startY+ 100 / 649 * canvasHeight, 235 / 464 * canvasWidth, startY+390 / 649 * canvasHeight)
  ];

  //Adjust the branch position that previously drawed by group
  specifiedBranch = branches.find(branch => branch.y1 === startY + 100 / 649 * canvasHeight);

 

  branches.forEach(branch => {
    branch.addApples(12); // Add apples to each branch
   // branch.drawApples(); // Draw the apples
    branch.drawBranch(); // Draw the branch
   
  });
}


function drawApplesOnBranches(canvasWidth, canvasHeight) {
    branches.forEach(branch => {
      branch.drawApples(12);
    });
  }



  function drawHalfRedHalfGreenApples() {
    branches.forEach(branch => {
      branch.apples.forEach(apple => {
        apple.color1 =  color(251, 88, 87); // Draw the apple half red and half green
      });
     
    });

  }
 
  //Make all apples to be red
  function drawRedApples() {
    branches.forEach(branch => {
      branch.apples.forEach(apple => {
        apple.color1 = endColor;
        apple.color2 = endColor;
      });
     
    });

  }

// Branch class for managing the drawing of branches and apples
class Branch {
  // Constructor initializes a branch with its start and end coordinates
  constructor(x1, y1, x2, y2) {
    this.x1 = x1; // Starting x-coordinate
    this.y1 = y1; // Starting y-coordinate
    this.x2 = x2; // Ending x-coordinate
    this.y2 = y2; // Ending y-coordinate
    this.apples = []; // Array to hold Apple objects on this branch
  }

  // Draws the branch as a line from its start to end points
  drawBranch() {
    stroke(64, 43, 48);  
    strokeWeight(2.5); 
    // Draw the line representing the branch
    line(this.x1, this.y1, this.x2, this.y2); 
  }

  // Draws the apples on the branch
  drawApples() {
    this.apples.forEach(apple => apple.draw());
  }

  // Adds a specified number of apples along the branch
  addApples(numApples) {
    // Calculate spacing between apples along the branch based on the number of apples
    let spacing = this.calculateSpacing(numApples);
    // Temporary variable for attempt count in positioning apples
    let attempts, maxAttempts = 100;

    for (let i = 0; i < numApples; i++) {
      // Randomly determine the diameter for each apple
      let appleDiameter = random(20, 85);
      let apple = new Apple(appleDiameter);
      attempts = 0; // Reset attempts for each apple

      // Position apples ensuring they do not overlap
      do {
        // Calculates the linear interpolation parameter t along the branch and sets the apple position        
        let t = (spacing * (i + 3)) / dist(this.x1, this.y1, this.x2, this.y2);
        apple.setPosition(lerp(this.x1, this.x2, t), lerp(this.y1, this.y2, t));

        if (this === specifiedBranch) {
          apple.y -= 60; // Move the apple upwards by 40 units
      }
        // Limit the number of attempts to position each apple to prevent infinite loops
        if (attempts++ > maxAttempts) {
          break;
        }
      } while (this.apples.some(a => applesOverlap(a, apple))); // Check for overlapping apples

        // If the maximum limit is not exceeded, draw and store apples      
        if (attempts <= maxAttempts) {
        this.apples.push(apple);
      }
    }
  }

  // Calculates the distance-based spacing between apples on the branch
  calculateSpacing(numApples) {
    return dist(this.x1, this.y1, this.x2, this.y2) / (numApples + 1);
  }

  // Added method to get the average position and a representative diameter for shadow casting
  getShadowCastingProperties() {
    return {
      x: (this.x1 + this.x2) / 2,
      y: (this.y1 + this.y2) / 2,
      diameter: 10 // Assumed diameter value
    };
  }
}

// Defines a function to check if two apples overlap
function applesOverlap(apple1, apple2) {
  // Calculate the distance between the centers of two apples
  let distance = dist(apple1.x, apple1.y, apple2.x, apple2.y);
  // Return true if the distance is less than the sum of their radii
  return distance < (apple1.diameter / 2 + apple2.diameter / 2);
}

// Apple class for creating and drawing apples
class Apple {
  constructor(diameter) {
    this.x = 0;  // x-coordinate of the apple's center
    this.y = 0;  // y-coordinate of the apple's center
    this.diameter = diameter;  // Diameter of the apple
    //this.color1 = color(251, 88, 87);  // One side color - red
    this.color1 = color(135, 173, 128); 
    this.color2 = color(135, 173, 128);  // Another side color - green
  }

  // Set the position of the apple
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  // Draw the apple with split colors
  draw() {
    // Set color arrangement by different split, color1 is red, color2 is green
    // Decide the split direction by different random number interval
    if (random() < 0.5) {
      // Split horizontally
      fill(this.color1);
      arc(this.x, this.y, this.diameter, this.diameter, PI, TWO_PI);
      fill(this.color2);
      arc(this.x, this.y, this.diameter, this.diameter, 0, PI);
    } else {
      // Split vertically
      fill(this.color1);
      arc(this.x, this.y, this.diameter, this.diameter, -HALF_PI, HALF_PI);
      fill(this.color2);
      arc(this.x, this.y, this.diameter, this.diameter, HALF_PI, -HALF_PI);
    }
  }
}

function drawSun() {
  let sunSize = min(width, height) * 0.15; // Adjust size relative to canvas size
  
  // Use Perlin noise for horizontal movement of the sun
  let noiseVal = noise(frameCount * 0.0005); // Perlin noise value
  
  // Calculate the x-position of the sun based on Perlin noise
  let sunX = sunXStart + noiseVal * (width * 0.3); // Adjust the range as needed
  
  let sunY = sunYStart; // Y-position of the sun (constant)
  
  // Set the fill color to the background color
  fill(146, 157, 155);
  
  // Erase the previous sun position by drawing a circle with the background color
  ellipse(prevSunX, sunY, sunSize, sunSize);
  
  // Update the previous sun position to the current sun position
  prevSunX = sunX;
  
  // Define inner and outer colors for the sun (red and yellow)
  let innerColor = color(255, 200, 100); 
  let outerColor = color(255, 50, 10);
  
  // Draw the sun using a gradient based on distance from the center
  for (let x = 0; x < sunSize; x++) {
    let percent = map(x, 0, sunSize, 0, 1);
    let sunColor = lerpColor(innerColor, outerColor, percent); // Get the color at this point of the gradient
    fill(sunColor); // Set the fill color
    noStroke();
    ellipse(sunX, sunY, sunSize - x, sunSize - x); // Draw the sun with the calculated color
  }
}

let raindrops = []; // Array to store raindrop objects
let lastDropFrame = 0; // Variable to store the frame count of the last raindrop creation


//Draw sun with Perlin Noise
function drawCloudAndRaindrops(canvasWidth, canvasHeight) {
  // Check if the cloud should be drawn based on the cloudVisible variable
  if (cloudVisible) {
    let cloudX = canvasWidth / 2;
    let cloudY = canvasHeight * 0.11;
    let cloudWidth = canvasWidth * 1.1;
    let cloudHeight = canvasHeight * 0.16;

    // Draw cloud
    let cloudColor = color(230, 230, 230);
    fill(cloudColor);
    noStroke();
    ellipse(cloudX - cloudWidth * 0.3, cloudY, cloudWidth * 0.3, cloudHeight * 0.7);
    ellipse(cloudX, cloudY, cloudWidth * 0.5, cloudHeight);
    ellipse(cloudX + cloudWidth * 0.3, cloudY, cloudWidth * 0.28, cloudHeight * 0.65);

    // Add new raindrops every 15 frames
    if (frameCount - lastDropFrame >= 15) {
      let dropX = random(cloudX - cloudWidth * 0.5, cloudX + cloudWidth * 0.5);
      let dropY = random(cloudY, cloudY + cloudHeight * 0.9); // Start raindrop within the cloud region
      raindrops.push({ x: dropX, y: dropY }); // Add the new raindrop to the array
      lastDropFrame = frameCount; // Update the last drop frame
    }

    fill(135, 206, 235); 

    for (let i = 0; i < raindrops.length; i++) {
      let drop = raindrops[i];
      let dropLength = random(25, 50); // Random raindrop
      let dropWidth = 4; // Set the width of the raindrop
      
      // Draw raindrop at its position with randomized length and fixed width
      ellipse(drop.x, canvasHeight * 0.12 + drop.y, dropWidth, dropLength);
    }
  }
}