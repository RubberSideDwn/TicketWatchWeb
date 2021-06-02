import React, { Component } from "react";
import "./ViolationsList.scss";

class ViolationsList extends Component {
    render() {
        const
        {summons_number, plate, state, issue_date, violation_time, violation, amount_due, url} = this.props;
    return(
        <div className="violation__list ">
        <div className="violation__list--item">
        <div className="violation__list--top">
            <div className="violation__list--left">
            <div className="violation__list--category">
                <h4 className="violation__list--label">REASON</h4>
                                
                    <h3 className="violation__list--violation">{violation}</h3>
            </div>
            <div className="violation__list--category">
                <h4 className="violation__list--label">PLATE</h4>
                <p className="violation__list--detail">{plate}</p>
            </div>
            <div className="violation__list--category">
                <h4 className="violation__list--label">STATE</h4>
            <p className="violation__list--detail">{state}</p>
            </div>
            </div>

            <div className="violation__list--right">
            <div className="violation__list--category">
                <h4 className="violation__list--label">DUE</h4>
                <p className="violation__list--detail">${amount_due}</p>
            </div>
            <div className="violation__list--category">
                <h4 className="violation__list--label">ISSUED</h4>
                <p className="violation__list--detail">{issue_date}<br className="mobile" /> {violation_time}</p>
            </div>
            <div className="violation__list--category">
                <h4 className="violation__list--label">SUMMONS</h4>
                <a href={url} target="_blank" rel="noreferrer"><p className="violation__list--link">{summons_number}</p></a>
            </div>
            </div>
        </div>
        </div>
    </div>    
    );
}
}

export default ViolationsList;