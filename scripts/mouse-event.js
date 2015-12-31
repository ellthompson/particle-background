module.exports = function() {

    var cursorX = 0;
    var cursorY = 0;
    var last_cursorX = 0;
    var last_cursorY = 0;

    document.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
    };

    function update_cursor() {
        old_cursorX = cursorX;
        old_cursorY = cursorY;
    }

    function movement() {
        return {
            x: old_cursorX - cursorX,
            y: old_cursorY - cursorY
        };
    }

    return {
        update_cursor: update_cursor,
        movement: movement
    };
};
