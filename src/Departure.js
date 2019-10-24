import React from 'react';
import './Departure.css';
import api_key from './key.js';

class Departure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.departure.id,
            route: props.departure.relationships.route,
            time: props.departure.attributes.departure_time,
            direction: props.departure.attributes.direction_id,
            status: props.departure.attributes.status,
            track: props.departure.track || "TBD",
        };
    }

    componentDidMount() {
        fetch('https://api-v3.mbta.com/routes/'+encodeURIComponent(this.state.route.data.id)+'?api_key='+api_key)
        .then(results => {
            return results.json();
        }).then(res => {
            this.setState({route_name: res.data.attributes.direction_destinations[this.state.direction]});
        });
    }
    
    render() {
        const timestamp = new Date(this.state.time);
        //const dispTime = timestamp.getHours().toString()+":"+timestamp.getMinutes().toString()+" ";
        const dispTime = timestamp.toLocaleTimeString();
        return (
            <div className="departure">
                <span className="route">{this.state.route_name}</span>
                <span className="departure-time">{dispTime}</span>
                <span className="current-status">{this.state.status}</span>
                <span className="track-number">{this.state.track}</span>
            </div>
        )
    }
}

export default Departure;