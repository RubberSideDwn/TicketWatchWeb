import React, { Component } from "react";
// import ViolationsList from "../ViolationsList/ViolationsList";

class Violations extends Component {
    state = {
        violations: [],
    };

render() {
    console.log();
    return (
<section className="violations">
        {/* <div className="violations__bkgrnd-color" />
        <div className="violations__container">
        <div className="violations__head">
        <h1 className="violations__head--text">VIOLATION</h1>
        </div>
        <div className="violations__bar">
        <h4 className="violations__bar--violations invSort">
        </h4>
        <h4 className="violations__bar--category invSort">CATEGORY</h4>
        <h4 className="violations__bar--status invSort">STATUS</h4>
        <h4 className="violations__bar--qty invSort">QTY</h4>
        <h4 className="violations__bar--warehouse invSort">WAREHOUSE</h4>
        <h4 className="violations__bar--action">ACTION</h4>
        </div>
</div> */}
{this.state.data.map()};
</section>
);
}
}

export default Violations;
// summons_number, plate, state, issue_date, violation_time, violation, fine_amount