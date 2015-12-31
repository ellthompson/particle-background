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
            y: previous_cursorY - cursorY
        };
    }

    return {
        update_cursor: update_cursor,
        movement: movement
    };
};
