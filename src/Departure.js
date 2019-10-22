import React from 'react';
import './Departure.css';
import api_key from './key.js';

class Departure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.departure,
            route: props.route,
            time: props.time,
        };
    }

    componentDidMount() {
        fetch('https://api-v3.mbta.com/routes/'+encodeURIComponent(this.state.route.data.id)+'?api_key='+api_key)
        .then(results => {
            return results.json();
        }).then(res => {
            this.setState({route_name: res.data.attributes.long_name});
        });
    }
    
    render() {
        return <div>{this.state.route_name}: {this.state.time}</div>
    }
}

export default Departure;