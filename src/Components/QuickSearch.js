import React from 'react';
import '../Styles/home.css';

import QuickSearchItem from './QuickSearchItem';

class QuickSearch extends React.Component {
    render() {
        const { quickSearchItemsData } = this.props;
        return (
            <div className="container">
                <div className="qshead">
                    Quick searches
                </div>
                <div className="qssubhead">
                    Discover Restaurants by type of meal
                </div>
                <div className="container">
                    <div className="row">
                        {quickSearchItemsData.map((item, index) => {
                            return <QuickSearchItem key={index} QSItemData={item} />
                        })}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default QuickSearch;