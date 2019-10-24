import React from 'react';
import './DepartureList.css';
import Departure from './Departure.js';
import api_key from './key.js';

class DepartureList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departures: [],
            track: null,
            title: props.title,
            id: props.id,
        }
    }
    
    componentDidMount() {
        //const now = new Date();
        //const curTime = now.getHours().toString()+":"+now.getMinutes().toString();
        fetch('https://api-v3.mbta.com/predictions?filter[stop]='+this.state.id+'&sort=-time&include=stop&api_key='+api_key)
        .then(results => {
            return results.json();
        }).then(res => {
            const filtered = res.data.filter(d => d.attributes.departure_time != null && d.attributes.status != null);
            this.setState({departures: filtered});
            this.setState({track: res.included[0].attributes.platform_code});
        });
    }

    render() {
        const departures = this.state.departures.map((departure) =>
            <Departure 
                key={departure.id} 
                departure={departure}
                track={this.state.track}
            />
        );
        return ( 
        <div className="departures">
            <h2>{this.state.title}: Departures</h2>
            <div className="departures-heading">
                <span>Destination</span>
                <span>Departure Time</span>
                <span>Boarding Status</span>
                <span>Track Number</span>
            </div>
            {departures}
        </div>
        )
    }
}

export default DepartureList;