import React from 'react';
import '../Styles/home.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            inputText: undefined,
            suggestions: []
        }
    }

    handlechangeLocation = (event) => {
       const locationId = event.target.value;
       sessionStorage.setItem('locationId', locationId);

       axios({
        url: ` https://fierce-fortress-94759.herokuapp.com/restaurants/${locationId}`,
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => {
            this.setState({ restaurants: res.data.restaurants })
        })
        .catch()
    }

    handleInputChange = (event) => {
        const { restaurants } = this.state;
        const inputText = event.target.value;

        
        let searchRestaurants = [];
        if (inputText) {
            searchRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        }

        this.setState({ suggestions: searchRestaurants, inputText });
    }

    selectedText = (resObj) => {
        this.props.history.push(`/details?restaurants=${resObj._id}`);
    }

    renderSuggestions = () => {
        const { suggestions, inputText } = this.state;

        if (suggestions.length == 0 && inputText == "") {
            return <ul >
                <li>No Search Results Found</li>
            </ul>
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{`${item.name} -   ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );
    }
    
    render() {
        const { locationsData } = this.props;
        const { restaurants } =this.state;
        return (
            <div>
                <div>
                <img src="Assets/homewall.png" width="100%" height="350px" ></img>
                </div>
                <div class="wallpaper-position-items">
                    <div class="logo">
                        <b>e!</b>
                    </div>
                    <div class="title">Find the best restaurants, cafés, and bars</div>
                    <div className="locationSelector">
                        <select class="dd" onChange={this.handlechangeLocation}>
                             <option value="0" >Select</option>
                            {locationsData.map((item, index) => {
                                return <option key={index + 1} value={item.location_id} >{`${item.name}, ${item.city}`}</option>
                            })}
                        </select>
                        <div>
                            <span className="glyphicon glyphicon-search search"></span>
                            <div id="notebooks">
                                <input id="query" className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" onChange={this.handleInputChange} />
                                {this.renderSuggestions()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default withRouter(Wallpaper);
