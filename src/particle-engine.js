import CONSTANTS from './constants.js';
import mouse from './mouse-event.js';
import Particle from './particle.js';

function particleEngine(canvas, config) {

    const { width, height } = canvas;
    const ctx = canvas.getContext("2d");
    if (config) {
        config = { ...CONSTANTS, ...config };
    } else {
        config = CONSTANTS;
    }

    function generateParticles() {
        const particles = new Array();
        for(var i = 0; i < config.particleCount; i++) {
            particles.push(new Particle(config, width, height));
        }
        return particles;
    }

    function render(particles) {
        ctx.clearRect(0, 0, width, height);
        for(var i = 0; i < particles.length; i++) {
            var particle = particles[i];
            particle.update_opacity();
            particle.add_mouse_velocity(mouse.movement());
            particle.update_position();
            particle.draw(ctx);
        }
        mouse.update_cursor();
    }

    const particles = generateParticles();
    setInterval(function(){
        render(particles);
    }, 1000 / config.frames);
};

export default particleEngine;
