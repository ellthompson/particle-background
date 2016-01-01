module.exports = function(width, height) {

    var opacity =  Math.random() / 5,
    opacity_increase = (Math.random() + 0.5) < 1 ? true : false,
    size = Math.random() * 30 + 10,
    pos_x = (Math.random() * (width + 80)) - 40,
    pos_y = (Math.random() * (height + 80)) - 40,
    vel_x = (Math.random() - 0.5) * 0.5,
    vel_y = (Math.random() - 0.5) * 0.5,
    mouse_vel_x = 0,
    mouse_vel_y = 0;

    function update_opacity() {
        opacity = opacity_increase ? opacity + 0.0005 : opacity - 0.0005;
        if (opacity < 0)
            opacity_increase = true;
        if (opacity > 0.2)
            opacity_increase = false;
    }

    function update_position() {
        var new_pos_x = pos_x + vel_x + mouse_vel_x;
        var new_pos_y = pos_y + vel_y + mouse_vel_y;
        mouse_vel_x *= 0.95;
        mouse_vel_y *= 0.95;
        pos_x = new_pos_x;
        pos_y = new_pos_y;
        validate_position();
    }

    function add_mouse_velocity(coords) {
        mouse_vel_x += coords.x / 200 / 80 * (size * 2);
        mouse_vel_y += coords.y / 200 / 80 * (size * 2);
        if (coords.pos_x > pos_x - size/2 && coords.pos_x < pos_x + size/2 && coords.pos_y > pos_y - size/2 && coords.pos_y < pos_y + size/2){
            var new_vel_x = coords.pos_x - pos_x;
            var new_vel_y = coords.pos_y - pos_y;
            mouse_vel_x -= new_vel_x / 20;
            mouse_vel_y -= new_vel_y / 20;
        }
    }

    function validate_position() {
        if (pos_x < -40)
            pos_x = width + 40;
        else if (pos_x > (width + 40))
            pos_x = -40;
        else if (pos_y < -40)
            pos_y = height + 40;
        else if (pos_y > (height + 40))
            pos_t = -40;
    }

    function draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'hsla(0, 100%, 100%,'+ opacity +')';
        ctx.arc(pos_x,pos_y,size, 0, Math.PI * 2);
        ctx.fill();
    }

    return {
        opacity: opacity,
        pos_x: pos_x,
        pos_y: pos_y,
        size: size,
        update_opacity: update_opacity,
        update_position: update_position,
        add_mouse_velocity: add_mouse_velocity,
        draw: draw
    };
};
