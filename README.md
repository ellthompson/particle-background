# HTML5 Canvas Particle Background

![](media/giphy.gif)

Creates a floating particle effect background which responds to mouse movement.

## Usage

* Create a container element in html as follows: `<div id="container"></div>`.
* Run `npm run webpack` which will create a js bundle under `./dist/bundle.js`.
* Add this bundle to your html document: `<script src="bundle.js"></script>`.
* The bundle will apply the particle background effect to the container element.

## Config

Configuration can be applied to the particle background to change the way it renders.
To apply configuration, edit the second argument of the particleEngine function within `./src/index.js`.

Example:
`particleEngine(canvas, { frames: 60 });`

All modifiable values can be viewed in [constants](src/constants.js).
