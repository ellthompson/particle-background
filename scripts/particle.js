module.exports = function(width, height) {

    var opacity =  Math.random() / 5;
    var opacity_increase = (Math.random() + 0.5) < 1 ? true : false;
    var size = Math.random() * 90 + 30;
    var pos_x = (Math.random() * (width + 80)) - 40;
    var pos_y = (Math.random() * (height + 80)) - 40;
    var vel_x = (Math.random() - 0.5) * 0.5;
    var vel_y = (Math.random() - 0.5) * 0.5;
    var mouse_vel_x = 0;
    var mouse_vel_y = 0;

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
        if (circle_hit_detection(pos_x, pos_y, coords.x, coords.y, size)) {
            var new_vel_x = coords.pos_x - pos_x;
            var new_vel_y = coords.pos_y - pos_y;
            mouse_vel_x -= new_vel_x / 20;
            mouse_vel_y -= new_vel_y / 20;
        }
    }

    function circle_hit_detection(center_x, center_y, pos_x, pos_y, size) {
        var dis_x = center_x - pos_x;
        var dis_y = center_y - pos_y;
        var distance = Math.sqrt(dis_x * dis_x + dis_y * dis_y);
        if (distance < (size / 2))
            return true;
        else
            return false;
    }

    function square_hit_detection(center_x, center_y, pos_x, pos_y, size) {
        var min_x = center_x - (size / 2);
        var max_x = center_x + (size / 2);
        var min_y = center_y - (size / 2);
        var max_y = center_y + (size / 2);
        if (pos_x > min_x && pos_x < max_x && pos_y > min_y && pos_y < max_y)
            return true;
        else
            return false;
    }

    function validate_position() {
        if (pos_x < -90)
            pos_x = width + 90;
        else if (pos_x > (width + 90))
            pos_x = -90;
        else if (pos_y < -90)
            pos_y = height + 90;
        else if (pos_y > (height + 90))
            pos_t = -90;
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
