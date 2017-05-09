(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZWxsaW90dC9wcm9qZWN0cy9wYXJ0aWNsZS1iYWNrZ3JvdW5kL3NjcmlwdHMvbW91c2UtZXZlbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxNQUFNLENBQUMsT0FBTyxHQUFHLFdBQVc7O0lBRXhCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNoQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDaEIsSUFBSSxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7QUFDN0IsSUFBSSxJQUFJLGdCQUFnQixHQUFHLENBQUMsQ0FBQzs7SUFFekIsUUFBUSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQztRQUM5QixPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNsQixPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMxQixLQUFLLENBQUM7O0lBRUYsU0FBUyxhQUFhLEdBQUc7UUFDckIsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1FBQzNCLGdCQUFnQixHQUFHLE9BQU8sQ0FBQztBQUNuQyxLQUFLOztJQUVELFNBQVMsUUFBUSxHQUFHO1FBQ2hCLE9BQU87WUFDSCxDQUFDLEVBQUUsZ0JBQWdCLEdBQUcsT0FBTztZQUM3QixDQUFDLEVBQUUsZ0JBQWdCLEdBQUcsT0FBTztZQUM3QixLQUFLLEVBQUUsT0FBTztZQUNkLEtBQUssRUFBRSxPQUFPO1NBQ2pCLENBQUM7QUFDVixLQUFLOztJQUVELE9BQU87UUFDSCxhQUFhLEVBQUUsYUFBYTtRQUM1QixRQUFRLEVBQUUsUUFBUTtLQUNyQixDQUFDO0NBQ0wsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGN1cnNvclggPSAwO1xuICAgIHZhciBjdXJzb3JZID0gMDtcbiAgICB2YXIgcHJldmlvdXNfY3Vyc29yWCA9IDA7XG4gICAgdmFyIHByZXZpb3VzX2N1cnNvclkgPSAwO1xuXG4gICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBmdW5jdGlvbihlKXtcbiAgICAgICAgY3Vyc29yWCA9IGUucGFnZVg7XG4gICAgICAgIGN1cnNvclkgPSBlLnBhZ2VZO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfY3Vyc29yKCkge1xuICAgICAgICBwcmV2aW91c19jdXJzb3JYID0gY3Vyc29yWDtcbiAgICAgICAgcHJldmlvdXNfY3Vyc29yWSA9IGN1cnNvclk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZW1lbnQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiBwcmV2aW91c19jdXJzb3JYIC0gY3Vyc29yWCxcbiAgICAgICAgICAgIHk6IHByZXZpb3VzX2N1cnNvclkgLSBjdXJzb3JZLFxuICAgICAgICAgICAgcG9zX3g6IGN1cnNvclgsXG4gICAgICAgICAgICBwb3NfeTogY3Vyc29yWVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHVwZGF0ZV9jdXJzb3I6IHVwZGF0ZV9jdXJzb3IsXG4gICAgICAgIG1vdmVtZW50OiBtb3ZlbWVudFxuICAgIH07XG59O1xuIl19
