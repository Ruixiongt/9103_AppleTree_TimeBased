## Instructions

The project is to animate the art work of ''Apple Tree'' with **Time-Based technique** which ultilised **frameCount to achieve the animation**. 

The animation progresses through different stages, illustrating the growth, maturation, and eventual harvest of apples from the tree.


   ### Stage1:  Initialisation
      - Setup: The canvas is initialized to the window's width and height.
      - Drawing: Initial elements such as the background, roots, and trunk of the tree are drawn.

   ### Stage2: Rainfall and Sunrise
      - Rainfall: Raindrops begin to fall, depicted by animated raindrops originating from a cloud.
      - Sunrise: The sun starts to rise, gradually appearing on the canvas.      

   ### Stage3: Growth and Maturation
      - Apples begin to grow on the tree branches, transitioning from green to a combination of red and green, symbolizing their maturation process.

   ### Mature and Completion 
      - Apple Harvest: All apples on the tree ripen and turn entirely red, indicating they are ready for harvest.
      - Completion: Fallen apples appear on the ground, symbolizing the completion of the apple tree's lifecycle.

**(Please note that the artwork does not require interaction to observe the apple's generation process)**

## Animation and difference
- The Group work is static painting 
- The painting layout has been adjusted, leaving more space for adding sun and clouds 
- More objects were added: Sun, Raindrops, Cloud and fallen apples 
- Time-based animation to show the lifecycle of the apple tree 



## Technical interpretation

### Setup
- **windowResized():** Adjusts canvas size and reinitializes elements.

### Time-Based Animation
- The animation utilizes the frameCount variable to progress through different stages over time.
- Key time intervals are utilized to trigger specific actions, marking significant events in the animation's progression:
- Rain starts falling at frame 200, creating a dynamic visual effect.
- The sun emerges onto the canvas at frame 500, introducing changes in lighting and atmosphere.
- Apples on the tree begin to mature, signaling their ripening process, with the first apples falling at frame 900, depicting the lifecycle progression of the tree.
- By frame 950, the animation concludes, with fallen apples scattered on the ground, symbolizing the completion of the lifecycle and the cycle of growth and renewal.

### Perlin Noise
- Perlin noise is used to simulate natural movements, such as the horizontal movement of the sun.
- The **noise()** function generates smooth, natural-looking transitions over time.


### Drawing:
- **draw():** Continuously called to render the frame, updating and drawing elements.
- **drawCanvas():** Draws background, oil painting effect, roots, bottom rectangle, branches, and trunk apple.
- **drawSun()** Animates the movement of the sun.
- **drawCloudAndRaindrops** Draws clouds and raindrops, animating their appearance.


### Classes:
- **Branch:** Manages branch drawing and apples.
- **Apple:** Handles apple growth, falling, and drawing


### Random Values:

- Random values are used extensively throughout the code to determine various properties such as positions, colors, sizes of raindrop,sizes of sun, size of apples, and growth rates.
- Functions like **random()** to generate the random values


## Citation and refernces 
**lerpcolor()** was used to draw the gradient color change of the sun