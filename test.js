let season = 0; // 0:spring, 1:summer, 2:autumn, 3:winter
let maxFramesPerSeason = 100; // Adjust this value for the desired duration of each season
let tree;

function setup() {
  createCanvas(600, 400);
  tree = new AppleTree(width/2, height - 50);
}

function draw() {
  background(220);
  
  // Determine the current season based on frameCount
  let currentFrame = frameCount % (maxFramesPerSeason * 4);
  if (currentFrame < maxFramesPerSeason) {
    season = 0; // Spring
  } else if (currentFrame < maxFramesPerSeason * 2) {
    season = 1; // Summer
  } else if (currentFrame < maxFramesPerSeason * 3) {
    season = 2; // Autumn
  } else {
    season = 3; // Winter
  }
  
  // Draw the apple tree based on the current season
  tree.draw(season);
}

class AppleTree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  draw(season) {
    // Draw the tree trunk
    fill(139, 69, 19);
    rect(this.x - 10, this.y, 20, -100);
    
    // Draw leaves and apples based on the season
    if (season === 0) { // Spring
      fill(0, 255, 0); // Green leaves
      ellipse(this.x, this.y - 100, 80, 80);
    } else if (season === 1) { // Summer
      fill(0, 128, 0); // Dark green leaves
      ellipse(this.x, this.y - 100, 80, 80);
      fill(255, 0, 0); // Red apples
      ellipse(this.x + 20, this.y - 120, 20, 20);
    } else if (season === 2) { // Autumn
      fill(255, 165, 0); // Orange leaves
      ellipse(this.x, this.y - 100, 80, 80);
      fill(255, 0, 0); // Red apples
      ellipse(this.x + 20, this.y - 120, 20, 20);
    } else { // Winter
      fill(255); // Snow-covered tree
      ellipse(this.x, this.y - 100, 80, 80);
    }
  }
}