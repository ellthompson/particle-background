var particleEngine = require('./particle-engine');

var container = document.getElementById("container");
var width = container.offsetWidth;
var height = container.offsetHeight;
var canvas = document.createElement("CANVAS");
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
canvas.setAttribute('style', 'position: absolute; background: -webkit-linear-gradient(left, #00BCD4,#9C27B0);');
container.appendChild(canvas);
particleEngine(canvas);
