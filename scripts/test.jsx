var React = require('react');
var ReactDOM = require('react-dom');

var Test = React.createClass({
    getInitialState: function() {
        return {
opacity: Math.random() / 5,
            opacity_increase: (Math.random() + 0.5) < 1 ? true : false,
            size: Math.random() * 3 + 2,
            pos_x: 0,
            pos_y: 0,
            vel_x: (Math.random() - 0.5) * 0.6,
            vel_y: (Math.random() - 0.5) * 0.6
        };
    },
    componentDidMount: function() {
        this.props.register(this);
    },
    notify: function() {
        if(this.isMounted()) {
            var updated_state = {};
            this.update_opacity(updated_state);
            this.update_position(updated_state);
            this.setState(updated_state);
        }
    },
    update_opacity: function(updated_state) {
        updated_state.opacity = this.state.opacity_increase ? this.state.opacity + 0.0005 : this.state.opacity - 0.0005;
        if (updated_state.opacity < 0)
            updated_state.opacity_increase = true;
        if (updated_state.opacity > 0.2)
            updated_state.opacity_increase = false;
    },
    update_position: function(updated_state) {
        var new_pos_x = this.state.pos_x + this.state.vel_x;
        var new_pos_y = this.state.pos_y + this.state.vel_y;
        if (!this.validate_position(new_pos_x, new_pos_y)) {
            this.reset_physics(updated_state);
        } else {
            updated_state.pos_x = new_pos_x;
            updated_state.pos_y = new_pos_y;
        }
    },
    reset_physics: function(updated_state) {
        updated_state.pos_x = Math.random() * this.state.width;
        updated_state.pos_y = Math.random() * this.state.height;
        updated_state.vel_x = (Math.random() - 0.5) * 0.2;
        updated_state.vel_y = (Math.random() - 0.5) * 0.2;
        updated_state.opacity = 0;
    },
    validate_position: function(pos_x, pos_y) {
        if (pos_x < -40)
            return false;
        else if (pos_x > this.state.width)
            return false;
        else if (pos_y < -40)
            return false;
        else if (pos_y > this.state.height)
            return false;
        return true;
    },
    set_particle_area: function(width, height) {
        this.setState({
            'width': width,
            'height': height,
            pos_x: Math.random() * width,
            pos_y: Math.random() * height,
        });
    },
    render: function() {
        return (
            <div style={{'-webkit-filter': 'blur(1px)', height: 10 * this.state.size + 'px', width: 10 * this.state.size + 'px', 'background-color':'hsla(190, 70%, 100%, ' + this.state.opacity + ')', 'border-radius': '50px', position: 'absolute', transform: 'translate('+this.state.pos_x+'px, '+this.state.pos_y+'px)'}}></div>
        );
    }
});

var testContainer = React.createClass({
    getInitialState: function(){
        return {
            observers: []
        };
    },
    componentDidMount: function() {
        var width = ReactDOM.findDOMNode(this).offsetWidth;
        var height = ReactDOM.findDOMNode(this).offsetHeight;
        this.particleEngine(width, height);
    },
    particleEngine: function(width, height) {
        for(var i = 0; i < this.state.observers.length; i++) {
            this.state.observers[i].set_particle_area(width, height);
        }
        var that = this;
        setInterval(function(){
            for(var i = 0; i < that.state.observers.length; i++) {
                that.state.observers[i].notify();
            }
        }, 1000/60);
    },
    register_observer: function(observer) {
        var old_observers = this.state.observers;
        old_observers.push(observer);
        this.setState({observers: old_observers});
    },
    render: function() {
        var particle_children = [];
        for(var i = 0; i < 600; i++) {
            particle_children.push(<Test register={this.register_observer} />);
        }
        return (
            <div style={{background: '-webkit-linear-gradient(left, hsla(0, 100%, 40%, 1),hsla(0, 100%, 80%, 1))', width: '100%', height: '100%', position: 'absolute', 'z-index': '-9999'}}>
                {particle_children}
            </div>
        );
    }
});

ReactDOM.render(
    React.createElement(testContainer, null),
    document.getElementById('container')
);
