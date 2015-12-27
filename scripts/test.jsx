var React = require('react');
var ReactDOM = require('react-dom');

var Test = React.createClass({
    getInitialState: function() {
        return {
            opacity: Math.random(),
            opacity_increase: (Math.random() - 0.5) < 1 ? true : false,
            scale: Math.random() * 5,
            pos_x: Math.random() * 400,
            pos_y: Math.random() * 400,
            vel_x: (Math.random() - 0.5) * 0.2,
            vel_y: (Math.random() - 0.5) * 0.2
        };
    },
    componentDidMount: function() {
        this.props.register(this);
    },
    notify: function() {
        this.update_opacity();
        this.update_position();
    },
    update_opacity: function() {
        this.setState({opacity: this.state.opacity_increase ? this.state.opacity + 0.002 : this.state.opacity - 0.002});
        if (this.state.opacity < 0)
            this.setState({opacity_increase: true});
        if (this.state.opacity > 1)
                    this.setState({opacity_increase: false});
    },
    update_position: function() {
        var new_pos_x = this.state.pos_x + this.state.vel_x;
        var new_pos_y = this.state.pos_y + this.state.vel_y;
        if (!this.validate_position(new_pos_x, new_pos_y)) {
            this.reset_physics();
        } else {
            this.setState({
                pos_x: new_pos_x,
                pos_y: new_pos_y,
            });
        }
    },
    validate_position: function(pos_x, pos_y) {
        if (pos_y < -40 || pos_y > 440 ||pos_x < -40 || pos_x > 440)
            return false;
        return true;
    },
    reset_physics: function() {
        this.setState({
            pos_x: Math.random() * 400,
            pos_y: Math.random() * 400,
            vel_x: (Math.random() - 0.5) * 0.2,
            vel_y: (Math.random() - 0.5) * 0.2
        });
    },
    render: function() {
        return (
            <div style={{width: '10px', height: '10px', background:'blue', 'border-radius': '50px', opacity: this.state.opacity, position: 'absolute', transform: 'translate('+this.state.pos_x+'px, '+this.state.pos_y+'px) scale('+this.state.scale+')'}}></div>
        );
    }
});

var testContainer = React.createClass({
    getInitialState: function(){
        return {
            particles: [1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            observers: []
        };
    },
    particleEngine: function() {
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
        this.particleEngine();
        var that = this;
        return (
            <div>
                {
                    this.state.particles.map(function(item, index) {
                        return <Test register={that.register_observer} id={index}/>;
                    })
                }
            </div>
        );
    }
});

ReactDOM.render(
    React.createElement(testContainer, null),
    document.getElementById('container')
);
