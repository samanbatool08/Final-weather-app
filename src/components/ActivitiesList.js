import React from 'react'; 
import ActivityShow from './ActivityShow';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'; 

class ActivitiesList extends React.Component {

    state = { 
        activities: [],
        type: null, 
        showOtherActivities: false
    }
    
    
    render() {
        console.log(this.state.key)    
        
        const getActivity = (activity) => {
            console.log('DOES THIS SHOW', activity)
            const proxyurl = "https://cors-anywhere.herokuapp.com/";
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.latitude},${this.props.longitude}&radius=500&type=${activity}&key=${process.env.REACT_APP_PLACES_KEY}`
            fetch(proxyurl + url)
            .then(resp => resp.json())
            .then((nearbyRestaurants) => {
                console.log('nearbyrest', nearbyRestaurants)
                console.log(url)
                this.setState({activities: nearbyRestaurants,
                                type: activity.includes('_') ? `${activity.replace(/_/g, ' ')}s` 
                                : !activity.endsWith('y') ? 
                                `${activity}s` 
                                : activity.replace(/y/g, 'ies') })
            })
        }

        const showAllActivities = (e) => {
            this.setState({showOtherActivities: true})
        } 

        const temp = (((this.props.temperature) - 273.15) * 9/5 +32)
                    
    return(
        <div className="activities">
            {temp > 65 ? 
            <div>
            <h2 className="title-container__subtitle" style={{color: '#f16051', textAlign: 'center'}}>Outdoor Activities near you</h2>
            <div style={{textAlign: 'center'}}>
                <div>        
            <button onClick={ () => getActivity('restaurant')}>Restaurants</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('park')}>Parks</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('bar')}>Bars</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('cafe')}>Cafes</button>
            <br />
            <br />
            {this.state.showOtherActivities && 
            <div>
            <h2 className="title-container__subtitle" style={{color: '#f16051', textAlign: 'center'}}>Indoor Activities near you</h2>
            <button style={{marginLeft: '10px'}} onClick={ () => getActivity('museum')}>Museums</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('gym')}>Gym</button>        
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('library')}>Libraries</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('bowling_alley')}>Bowling</button>
            <div><br /></div>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('movie_theater')}>Movies</button>
            </div>
            }
            <br />
            <br />
            <br />
            <button onClick={() => showAllActivities()}>See other activities</button>
            </div>
            </div>
            {this.state.activities.length !==0 && <ActivityShow activities={this.state.activities} type={this.state.type}
                                                                userId={this.props.userId} date={this.props.todaysDate}
                                                                addUserActivity={this.props.addUserActivity}
                                                                userActivities={this.props.userActivities}/>}
            </div>
            :
            <div>
            <h2 className="title-container__subtitle" style={{color: '#f16051', textAlign: 'center'}}>Indoor Activities near you</h2>
            <div style={{textAlign: 'center'}}>
                <div>        
            <button onClick={ () => getActivity('restaurant')}>Restaurants</button>
            <button style={{marginLeft: '10px'}} onClick={ () => getActivity('museum')}>Museums</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('gym')}>Gym</button>        
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('library')}>Libraries</button>
            </div><br />
            <div>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('bowling_alley')}>Bowling</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('movie_theater')}>Movies</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('bar')}>Bars</button>
            <button style={{marginLeft: '10px'}} onClick={() => getActivity('cafe')}>Cafes</button>
            </div>
            </div>
            {this.state.activities.length !==0 && <ActivityShow activities={this.state.activities} type={this.state.type}
                                                                userId={this.props.userId} date={this.props.todaysDate}
                                                                addUserActivity={this.props.addUserActivity}
                                                                userActivities={this.props.userActivities}/>}
            </div>}

        </div>
    )
}
}


export default ActivitiesList;

