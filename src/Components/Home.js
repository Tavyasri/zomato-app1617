import React from 'react';
import axios from 'axios';
import '../Styles/home.css';

import Wallpaper from './wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            quickSearchItems: []
        }
    }
    componentDidMount(){
        sessionStorage.clear();
        axios({
            url: ' https://powerful-falls-44108.herokuapp.com/locations',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            this.setState({ locations: res.data.locations })
        })
        .catch()

        axios({
            url: ' https://powerful-falls-44108.herokuapp.com/mealtypes',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ quickSearchItems: res.data.mealTypes })
            })
            .catch()
    }
    
    render() {
        const { locations , quickSearchItems } = this.state;
        return (
            <div>
               <Wallpaper locationsData={locations} />
                <QuickSearch quickSearchItemsData={quickSearchItems}/>
            </div>
        )
    }
}

export default Home;
