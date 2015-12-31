var particles = [];
var width = 800;
var height = 800;

for(var i = 0; i < 1000; i++) {
    particles.push({
        opacity: Math.random() / 5,
        opacity_increase: (Math.random() + 0.5) < 1 ? true : false,
        size: Math.random() * 10 + 20,
        pos_x: Math.random() * width,
        pos_y: Math.random() * height,
        vel_x: (Math.random() - 0.5) * 3.0,
        vel_y: (Math.random() - 0.5) * 3.0,
        element: document.createElement("DIV")
    });
}

function setElementStyle(particle) {
    particle.element.setAttribute('style', '-webkit-filter: blur(1px); height: ' + (10 * particle.size) + 'px; width: ' + (10 * particle.size) + 'px; background-color: black; opacity: ' + particle.opacity + '; border-radius: 50px; position: absolute; transform: translate(' + particle.pos_x + 'px, ' + particle.pos_y + 'px);');
}


function update_opacity(particle) {
    particle.opacity = particle.opacity_increase ? particle.opacity + 0.0005 : particle.opacity - 0.0005;
    if (particle.opacity < 0)
        particle.opacity_increase = true;
    if (particle.opacity > 0.2)
        particle.opacity_increase = false;
}


function update_position(updated_state) {
    var new_pos_x = updated_state.pos_x + updated_state.vel_x;
    var new_pos_y = updated_state.pos_y + updated_state.vel_y;
    if (!validate_position(new_pos_x, new_pos_y)) {
        reset_physics(updated_state);
    } else {
        updated_state.pos_x = new_pos_x;
        updated_state.pos_y = new_pos_y;
    }
}

function reset_physics(updated_state) {
    updated_state.pos_x = Math.random() * width;
    updated_state.pos_y = Math.random() * height;
    updated_state.vel_x = (Math.random() - 0.5) * 3.0;
    updated_state.vel_y = (Math.random() - 0.5) * 3.0;
    updated_state.opacity = 0;
}

function validate_position(pos_x, pos_y) {
    if (pos_x < -40)
        return false;
    else if (pos_x > width)
        return false;
    else if (pos_y < -40)
        return false;
    else if (pos_y > height)
        return false;
    return true;
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

setInterval(function(){
    ctx.clearRect(0, 0, width, height);
    for(var i = 0; i < particles.length; i++) {
        update_opacity(particles[i]);
        update_position(particles[i]);
        ctx.beginPath();
        ctx.fillStyle = 'hsla(0, 100%, 100%,'+ particles[i].opacity +')';
        ctx.arc(particles[i].pos_x,particles[i].pos_y, particles[i].size, 0, Math.PI * 2);
        ctx.fill();
    }
}, 1000/60);
