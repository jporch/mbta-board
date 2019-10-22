import React from 'react';
import './Departure.css';

class Departure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.departure,
            route: props.route,
            time: props.time,
        };
    }
    
    render() {
        return <div>{this.state.route.data.id}: {this.state.time}</div>
    }
}

export default Departure;