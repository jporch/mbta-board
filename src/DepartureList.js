import React from 'react';
import './DepartureList.css';
import Departure from './Departure.js';
import api_key from './key.js';

class DepartureList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departures: [],
        }
    }
    
    componentDidMount() {
        fetch('https://api-v3.mbta.com/schedules?filter[stop]=South%20Station&sort=time&api_key='+api_key)
        .then(results => {
            return results.json();
        }).then(res => {
            const filtered = res['data'].filter(d => d.attributes.departure_time != null);
            this.setState({departures: filtered.slice(0,10)});
        });
    }

    render() {
        const departures = this.state.departures.map((departure) =>
            <Departure 
                key={departure.id} 
                departure={departure.id}
                route={departure.relationships.route}
                time={departure.attributes.departure_time}
            />
        );
        return ( 
        <div id="departure">
            {departures}
        </div>
        )
    }
}

export default DepartureList;