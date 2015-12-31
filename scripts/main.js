var particle = require('./particle');
var mouse = require('./mouse-event')();

var container = document.getElementById("container");
var width = container.offsetWidth;
var height = container.offsetHeight;
var canvas = document.createElement("CANVAS");
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
canvas.setAttribute('style', 'position: absolute; background: -webkit-linear-gradient(left, hsla(25, 100%, 40%, 1),hsla(25, 100%, 80%, 1));');
container.appendChild(canvas);
var ctx = canvas.getContext("2d");
var particles = [];

for(var i = 0; i < 100; i++) {
    particles.push(particle(width, height));
}

setInterval(function(){
    ctx.clearRect(0, 0, width, height);
    for(var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        particle.update_opacity();
        particle.add_mouse_velocity(mouse.movement());
        particle.update_position();
        particle.draw(ctx);
    }
    mouse.update_cursor();

}, 1000/60);
