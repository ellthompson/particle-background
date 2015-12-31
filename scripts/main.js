var particles = [];
var width = 800;
var height = 800;

var particle = require('./particle');
var mouse = require('./mouse-event');

for(var i = 0; i < 1000; i++) {
    particles.push(particle(width, height));
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

setInterval(function(){
    ctx.clearRect(0, 0, width, height);
    for(var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        particle.update_opacity();
        particle.add_mouse_velocity(mouse.movement());
        particle.update_position();
        particle.draw(ctx);
        mouse.update_cursor();
    }


}, 1000/60);

