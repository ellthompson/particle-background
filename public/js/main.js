(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    PARTICLE_COUNT: 100,
    MIN_PARTICLE_DIAMETER: 30,
    MAX_PARTICLE_DIAMETER: 100,
    PARTICLE_DECELERATION: 0.92,
    FRAMES: 60,
    BASE_VELOCITY: 0.8,
};

},{}],2:[function(require,module,exports){
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

},{"./particle-engine":4}],3:[function(require,module,exports){
module.exports = function() {

    var cursorX = 0;
    var cursorY = 0;
    var previous_cursorX = 0;
    var previous_cursorY = 0;

    document.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
    };

    function update_cursor() {
        previous_cursorX = cursorX;
        previous_cursorY = cursorY;
    }

    function movement() {
        return {
            x: previous_cursorX - cursorX,
            y: previous_cursorY - cursorY,
            pos_x: cursorX,
            pos_y: cursorY
        };
    }

    return {
        update_cursor: update_cursor,
        movement: movement
    };
};

},{}],4:[function(require,module,exports){
var CONSTANTS = require('./constants.js');
var mouse = require('./mouse-event')();
var Particle = require('./particle');

module.exports = function(canvas) {

    const { width, height } = canvas;
    const ctx = canvas.getContext("2d");

    function generateParticles() {
        const particles = new Array();
        for(var i = 0; i < CONSTANTS.PARTICLE_COUNT; i++) {
            particles.push(new Particle(width, height));
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
    }, 1000 / CONSTANTS.FRAMES);
};

},{"./constants.js":1,"./mouse-event":3,"./particle":5}],5:[function(require,module,exports){
var CONSTANTS = require('./constants.js');

module.exports = function(width, height) {
    this.width = width;
    this.height = height;

    var opacity =  Math.random() / 5;
    var opacity_increase = (Math.random() + 0.5) < 1 ? true : false;
    var minMaxDiameterDifference = CONSTANTS.MAX_PARTICLE_DIAMETER - CONSTANTS.MIN_PARTICLE_DIAMETER;
    var size = CONSTANTS.MIN_PARTICLE_DIAMETER + (Math.random() * minMaxDiameterDifference);
    var areaWidth = CONSTANTS.MAX_PARTICLE_DIAMETER * 2 + this.width;
    var areaHeight = CONSTANTS.MAX_PARTICLE_DIAMETER * 2 + this.height;
    var pos_x = (Math.random() * areaWidth) - CONSTANTS.MAX_PARTICLE_DIAMETER;
    var pos_y = (Math.random() * areaHeight) - CONSTANTS.MAX_PARTICLE_DIAMETER;
    var vel_x = (Math.random() - 0.5) * CONSTANTS.BASE_VELOCITY;
    var vel_y = (Math.random() - 0.5) * CONSTANTS.BASE_VELOCITY;
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
        mouse_vel_x *= CONSTANTS.PARTICLE_DECELERATION;
        mouse_vel_y *= CONSTANTS.PARTICLE_DECELERATION;
        pos_x = new_pos_x;
        pos_y = new_pos_y;
        validate_position();
    }

    function add_mouse_velocity(coords) {
        mouse_vel_x += coords.x / 400 / 80 * (size * 2);
        mouse_vel_y += coords.y / 400 / 80 * (size * 2);
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
        if (pos_x < - CONSTANTS.MAX_PARTICLE_DIAMETER)
            pos_x = this.width + CONSTANTS.MAX_PARTICLE_DIAMETER;
        else if (pos_x > (this.width + CONSTANTS.MAX_PARTICLE_DIAMETER))
            pos_x = - CONSTANTS.MAX_PARTICLE_DIAMETER;
        else if (pos_y < - CONSTANTS.MAX_PARTICLE_DIAMETER)
            pos_y = this.height + CONSTANTS.MAX_PARTICLE_DIAMETER;
        else if (pos_y > (this.height + CONSTANTS.MAX_PARTICLE_DIAMETER))
            pos_t = - CONSTANTS.MAX_PARTICLE_DIAMETER;
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

},{"./constants.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZWxsaW90dC9wcm9qZWN0cy9wYXJ0aWNsZS1iYWNrZ3JvdW5kL3NjcmlwdHMvY29uc3RhbnRzLmpzIiwiL1VzZXJzL2VsbGlvdHQvcHJvamVjdHMvcGFydGljbGUtYmFja2dyb3VuZC9zY3JpcHRzL21haW4uanMiLCIvVXNlcnMvZWxsaW90dC9wcm9qZWN0cy9wYXJ0aWNsZS1iYWNrZ3JvdW5kL3NjcmlwdHMvbW91c2UtZXZlbnQuanMiLCIvVXNlcnMvZWxsaW90dC9wcm9qZWN0cy9wYXJ0aWNsZS1iYWNrZ3JvdW5kL3NjcmlwdHMvcGFydGljbGUtZW5naW5lLmpzIiwiL1VzZXJzL2VsbGlvdHQvcHJvamVjdHMvcGFydGljbGUtYmFja2dyb3VuZC9zY3JpcHRzL3BhcnRpY2xlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsTUFBTSxDQUFDLE9BQU8sR0FBRztJQUNiLGNBQWMsRUFBRSxHQUFHO0lBQ25CLHFCQUFxQixFQUFFLEVBQUU7SUFDekIscUJBQXFCLEVBQUUsR0FBRztJQUMxQixxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLE1BQU0sRUFBRSxFQUFFO0lBQ1YsYUFBYSxFQUFFLEdBQUc7Q0FDckIsQ0FBQzs7O0FDUEYsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7O0FBRWxELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckQsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztBQUNsQyxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO0FBQ3BDLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEMsTUFB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O0FBQ25CLEtBQUs7O0lBRUQsT0FBTztRQUNILE9BQU8sRUFBRSxPQUFPO1FBQ2hCLEtBQUssRUFBRSxLQUFLO1FBQ1osS0FBSyxFQUFFLEtBQUs7UUFDWixJQUFJLEVBQUUsSUFBSTtRQUNWLGNBQWMsRUFBRSxjQUFjO1FBQzlCLGVBQWUsRUFBRSxlQUFlO1FBQ2hDLGtCQUFrQixFQUFFLGtCQUFrQjtRQUN0QyxJQUFJLEVBQUUsSUFBSTtLQUNiLENBQUM7Q0FDTCxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIFBBUlRJQ0xFX0NPVU5UOiAxMDAsXG4gICAgTUlOX1BBUlRJQ0xFX0RJQU1FVEVSOiAzMCxcbiAgICBNQVhfUEFSVElDTEVfRElBTUVURVI6IDEwMCxcbiAgICBQQVJUSUNMRV9ERUNFTEVSQVRJT046IDAuOTIsXG4gICAgRlJBTUVTOiA2MCxcbiAgICBCQVNFX1ZFTE9DSVRZOiAwLjgsXG59O1xuIiwidmFyIHBhcnRpY2xlRW5naW5lID0gcmVxdWlyZSgnLi9wYXJ0aWNsZS1lbmdpbmUnKTtcblxudmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyXCIpO1xudmFyIHdpZHRoID0gY29udGFpbmVyLm9mZnNldFdpZHRoO1xudmFyIGhlaWdodCA9IGNvbnRhaW5lci5vZmZzZXRIZWlnaHQ7XG52YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkNBTlZBU1wiKTtcbmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGgpO1xuY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0KTtcbmNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ3Bvc2l0aW9uOiBhYnNvbHV0ZTsgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQobGVmdCwgIzAwQkNENCwjOUMyN0IwKTsnKTtcbmNvbnRhaW5lci5hcHBlbmRDaGlsZChjYW52YXMpO1xucGFydGljbGVFbmdpbmUoY2FudmFzKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgY3Vyc29yWCA9IDA7XG4gICAgdmFyIGN1cnNvclkgPSAwO1xuICAgIHZhciBwcmV2aW91c19jdXJzb3JYID0gMDtcbiAgICB2YXIgcHJldmlvdXNfY3Vyc29yWSA9IDA7XG5cbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGUpe1xuICAgICAgICBjdXJzb3JYID0gZS5wYWdlWDtcbiAgICAgICAgY3Vyc29yWSA9IGUucGFnZVk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9jdXJzb3IoKSB7XG4gICAgICAgIHByZXZpb3VzX2N1cnNvclggPSBjdXJzb3JYO1xuICAgICAgICBwcmV2aW91c19jdXJzb3JZID0gY3Vyc29yWTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlbWVudCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IHByZXZpb3VzX2N1cnNvclggLSBjdXJzb3JYLFxuICAgICAgICAgICAgeTogcHJldmlvdXNfY3Vyc29yWSAtIGN1cnNvclksXG4gICAgICAgICAgICBwb3NfeDogY3Vyc29yWCxcbiAgICAgICAgICAgIHBvc195OiBjdXJzb3JZXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXBkYXRlX2N1cnNvcjogdXBkYXRlX2N1cnNvcixcbiAgICAgICAgbW92ZW1lbnQ6IG1vdmVtZW50XG4gICAgfTtcbn07XG4iLCJ2YXIgQ09OU1RBTlRTID0gcmVxdWlyZSgnLi9jb25zdGFudHMuanMnKTtcbnZhciBtb3VzZSA9IHJlcXVpcmUoJy4vbW91c2UtZXZlbnQnKSgpO1xudmFyIFBhcnRpY2xlID0gcmVxdWlyZSgnLi9wYXJ0aWNsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGNhbnZhcykge1xuXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBjYW52YXM7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlUGFydGljbGVzKCkge1xuICAgICAgICBjb25zdCBwYXJ0aWNsZXMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IENPTlNUQU5UUy5QQVJUSUNMRV9DT1VOVDsgaSsrKSB7XG4gICAgICAgICAgICBwYXJ0aWNsZXMucHVzaChuZXcgUGFydGljbGUod2lkdGgsIGhlaWdodCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJ0aWNsZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyKHBhcnRpY2xlcykge1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcGFydGljbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcGFydGljbGUgPSBwYXJ0aWNsZXNbaV07XG4gICAgICAgICAgICBwYXJ0aWNsZS51cGRhdGVfb3BhY2l0eSgpO1xuICAgICAgICAgICAgcGFydGljbGUuYWRkX21vdXNlX3ZlbG9jaXR5KG1vdXNlLm1vdmVtZW50KCkpO1xuICAgICAgICAgICAgcGFydGljbGUudXBkYXRlX3Bvc2l0aW9uKCk7XG4gICAgICAgICAgICBwYXJ0aWNsZS5kcmF3KGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgbW91c2UudXBkYXRlX2N1cnNvcigpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhcnRpY2xlcyA9IGdlbmVyYXRlUGFydGljbGVzKCk7XG4gICAgc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcbiAgICAgICAgcmVuZGVyKHBhcnRpY2xlcyk7XG4gICAgfSwgMTAwMCAvIENPTlNUQU5UUy5GUkFNRVMpO1xufTtcbiIsInZhciBDT05TVEFOVFMgPSByZXF1aXJlKCcuL2NvbnN0YW50cy5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG5cbiAgICB2YXIgb3BhY2l0eSA9ICBNYXRoLnJhbmRvbSgpIC8gNTtcbiAgICB2YXIgb3BhY2l0eV9pbmNyZWFzZSA9IChNYXRoLnJhbmRvbSgpICsgMC41KSA8IDEgPyB0cnVlIDogZmFsc2U7XG4gICAgdmFyIG1pbk1heERpYW1ldGVyRGlmZmVyZW5jZSA9IENPTlNUQU5UUy5NQVhfUEFSVElDTEVfRElBTUVURVIgLSBDT05TVEFOVFMuTUlOX1BBUlRJQ0xFX0RJQU1FVEVSO1xuICAgIHZhciBzaXplID0gQ09OU1RBTlRTLk1JTl9QQVJUSUNMRV9ESUFNRVRFUiArIChNYXRoLnJhbmRvbSgpICogbWluTWF4RGlhbWV0ZXJEaWZmZXJlbmNlKTtcbiAgICB2YXIgYXJlYVdpZHRoID0gQ09OU1RBTlRTLk1BWF9QQVJUSUNMRV9ESUFNRVRFUiAqIDIgKyB0aGlzLndpZHRoO1xuICAgIHZhciBhcmVhSGVpZ2h0ID0gQ09OU1RBTlRTLk1BWF9QQVJUSUNMRV9ESUFNRVRFUiAqIDIgKyB0aGlzLmhlaWdodDtcbiAgICB2YXIgcG9zX3ggPSAoTWF0aC5yYW5kb20oKSAqIGFyZWFXaWR0aCkgLSBDT05TVEFOVFMuTUFYX1BBUlRJQ0xFX0RJQU1FVEVSO1xuICAgIHZhciBwb3NfeSA9IChNYXRoLnJhbmRvbSgpICogYXJlYUhlaWdodCkgLSBDT05TVEFOVFMuTUFYX1BBUlRJQ0xFX0RJQU1FVEVSO1xuICAgIHZhciB2ZWxfeCA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIENPTlNUQU5UUy5CQVNFX1ZFTE9DSVRZO1xuICAgIHZhciB2ZWxfeSA9IChNYXRoLnJhbmRvbSgpIC0gMC41KSAqIENPTlNUQU5UUy5CQVNFX1ZFTE9DSVRZO1xuICAgIHZhciBtb3VzZV92ZWxfeCA9IDA7XG4gICAgdmFyIG1vdXNlX3ZlbF95ID0gMDtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9vcGFjaXR5KCkge1xuICAgICAgICBvcGFjaXR5ID0gb3BhY2l0eV9pbmNyZWFzZSA/IG9wYWNpdHkgKyAwLjAwMDUgOiBvcGFjaXR5IC0gMC4wMDA1O1xuICAgICAgICBpZiAob3BhY2l0eSA8IDApXG4gICAgICAgICAgICBvcGFjaXR5X2luY3JlYXNlID0gdHJ1ZTtcbiAgICAgICAgaWYgKG9wYWNpdHkgPiAwLjIpXG4gICAgICAgICAgICBvcGFjaXR5X2luY3JlYXNlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlX3Bvc2l0aW9uKCkge1xuICAgICAgICB2YXIgbmV3X3Bvc194ID0gcG9zX3ggKyB2ZWxfeCArIG1vdXNlX3ZlbF94O1xuICAgICAgICB2YXIgbmV3X3Bvc195ID0gcG9zX3kgKyB2ZWxfeSArIG1vdXNlX3ZlbF95O1xuICAgICAgICBtb3VzZV92ZWxfeCAqPSBDT05TVEFOVFMuUEFSVElDTEVfREVDRUxFUkFUSU9OO1xuICAgICAgICBtb3VzZV92ZWxfeSAqPSBDT05TVEFOVFMuUEFSVElDTEVfREVDRUxFUkFUSU9OO1xuICAgICAgICBwb3NfeCA9IG5ld19wb3NfeDtcbiAgICAgICAgcG9zX3kgPSBuZXdfcG9zX3k7XG4gICAgICAgIHZhbGlkYXRlX3Bvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX21vdXNlX3ZlbG9jaXR5KGNvb3Jkcykge1xuICAgICAgICBtb3VzZV92ZWxfeCArPSBjb29yZHMueCAvIDQwMCAvIDgwICogKHNpemUgKiAyKTtcbiAgICAgICAgbW91c2VfdmVsX3kgKz0gY29vcmRzLnkgLyA0MDAgLyA4MCAqIChzaXplICogMik7XG4gICAgICAgIGlmIChjaXJjbGVfaGl0X2RldGVjdGlvbihwb3NfeCwgcG9zX3ksIGNvb3Jkcy54LCBjb29yZHMueSwgc2l6ZSkpIHtcbiAgICAgICAgICAgIHZhciBuZXdfdmVsX3ggPSBjb29yZHMucG9zX3ggLSBwb3NfeDtcbiAgICAgICAgICAgIHZhciBuZXdfdmVsX3kgPSBjb29yZHMucG9zX3kgLSBwb3NfeTtcbiAgICAgICAgICAgIG1vdXNlX3ZlbF94IC09IG5ld192ZWxfeCAvIDIwO1xuICAgICAgICAgICAgbW91c2VfdmVsX3kgLT0gbmV3X3ZlbF95IC8gMjA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaXJjbGVfaGl0X2RldGVjdGlvbihjZW50ZXJfeCwgY2VudGVyX3ksIHBvc194LCBwb3NfeSwgc2l6ZSkge1xuICAgICAgICB2YXIgZGlzX3ggPSBjZW50ZXJfeCAtIHBvc194O1xuICAgICAgICB2YXIgZGlzX3kgPSBjZW50ZXJfeSAtIHBvc195O1xuICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZGlzX3ggKiBkaXNfeCArIGRpc195ICogZGlzX3kpO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPCAoc2l6ZSAvIDIpKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcXVhcmVfaGl0X2RldGVjdGlvbihjZW50ZXJfeCwgY2VudGVyX3ksIHBvc194LCBwb3NfeSwgc2l6ZSkge1xuICAgICAgICB2YXIgbWluX3ggPSBjZW50ZXJfeCAtIChzaXplIC8gMik7XG4gICAgICAgIHZhciBtYXhfeCA9IGNlbnRlcl94ICsgKHNpemUgLyAyKTtcbiAgICAgICAgdmFyIG1pbl95ID0gY2VudGVyX3kgLSAoc2l6ZSAvIDIpO1xuICAgICAgICB2YXIgbWF4X3kgPSBjZW50ZXJfeSArIChzaXplIC8gMik7XG4gICAgICAgIGlmIChwb3NfeCA+IG1pbl94ICYmIHBvc194IDwgbWF4X3ggJiYgcG9zX3kgPiBtaW5feSAmJiBwb3NfeSA8IG1heF95KVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWxpZGF0ZV9wb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKHBvc194IDwgLSBDT05TVEFOVFMuTUFYX1BBUlRJQ0xFX0RJQU1FVEVSKVxuICAgICAgICAgICAgcG9zX3ggPSB0aGlzLndpZHRoICsgQ09OU1RBTlRTLk1BWF9QQVJUSUNMRV9ESUFNRVRFUjtcbiAgICAgICAgZWxzZSBpZiAocG9zX3ggPiAodGhpcy53aWR0aCArIENPTlNUQU5UUy5NQVhfUEFSVElDTEVfRElBTUVURVIpKVxuICAgICAgICAgICAgcG9zX3ggPSAtIENPTlNUQU5UUy5NQVhfUEFSVElDTEVfRElBTUVURVI7XG4gICAgICAgIGVsc2UgaWYgKHBvc195IDwgLSBDT05TVEFOVFMuTUFYX1BBUlRJQ0xFX0RJQU1FVEVSKVxuICAgICAgICAgICAgcG9zX3kgPSB0aGlzLmhlaWdodCArIENPTlNUQU5UUy5NQVhfUEFSVElDTEVfRElBTUVURVI7XG4gICAgICAgIGVsc2UgaWYgKHBvc195ID4gKHRoaXMuaGVpZ2h0ICsgQ09OU1RBTlRTLk1BWF9QQVJUSUNMRV9ESUFNRVRFUikpXG4gICAgICAgICAgICBwb3NfdCA9IC0gQ09OU1RBTlRTLk1BWF9QQVJUSUNMRV9ESUFNRVRFUjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3KGN0eCkge1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAnaHNsYSgwLCAxMDAlLCAxMDAlLCcrIG9wYWNpdHkgKycpJztcbiAgICAgICAgY3R4LmFyYyhwb3NfeCxwb3NfeSxzaXplLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgb3BhY2l0eTogb3BhY2l0eSxcbiAgICAgICAgcG9zX3g6IHBvc194LFxuICAgICAgICBwb3NfeTogcG9zX3ksXG4gICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgIHVwZGF0ZV9vcGFjaXR5OiB1cGRhdGVfb3BhY2l0eSxcbiAgICAgICAgdXBkYXRlX3Bvc2l0aW9uOiB1cGRhdGVfcG9zaXRpb24sXG4gICAgICAgIGFkZF9tb3VzZV92ZWxvY2l0eTogYWRkX21vdXNlX3ZlbG9jaXR5LFxuICAgICAgICBkcmF3OiBkcmF3XG4gICAgfTtcbn07XG4iXX0=
