import React from 'react';
import '../Styles/home.css';
import { withRouter} from 'react-router-dom'

class QuickSearchItem extends React.Component {
    handleNavigate = (mealtypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if (locationId) {
            this.props.history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`);
        }
        else {
        this.props.history.push(`/filter?mealtype=${mealtypeId}`);
        }
    }
    render() {
        const { QSItemData, key } = this.props;
        return (
            <div className="col-sm-12 col-md-6 col-lg-4 item m-1 ms-sm-2" onClick={() => this.handleNavigate(QSItemData.meal_type)}>
                <div key={ QSItemData._id }>
                    <div className="qsimage" >
                         <img src={`./${QSItemData.image}`} height="100%" width="100%" ></img>
                    </div>
                    <div className="qsmenu">
                        <div className="menu-head">{QSItemData.name}</div>
                        <div className="menu-content">{QSItemData.content}</div>
                    </div>
                </div>
            </div>  
        )
    }
}

export default withRouter(QuickSearchItem);