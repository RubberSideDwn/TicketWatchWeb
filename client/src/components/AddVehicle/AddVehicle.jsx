import React, { Component } from "react";
// import { Link } from "react-router-dom";
import axios from "axios";
import "./AddVehicle.scss";

const initialState = {
    vehName: '', 
    plate: '', 
    state: ''
};


class AddVehicle extends Component {
    state = initialState;

    validate = () => {
        let vehName = "";
        let plate = "";
        let state = "";

        if (!this.state.vehName) {
            
            vehName = "This field is required";
        }
        if (!this.state.plate) {
            plate = "This field is required";
        }
        if (!this.state.state) {
            state = "This field is required";
        }
    }

    handleChangeName = (e) => {
        this.setState({ vehName: e.target.value });
        console.log(this.state.vehName); 
    }
    handleChangePlate = (e) => {
        this.setState({ plate: e.target.value });
        console.log(this.state.plate); 
    }
    handleChangeState = (e) => {
        this.setState({ state: e.target.value });
        console.log(this.state.state); 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleName(e); 
        this.handlePlate(e);
        this.handleState(e);

        console.log(e.target.vehName)
        const isValid = this.validate()
        console.log(this.state.vehName, this.state.plate, this.state.state);

        if (isValid) {
        axios
            .post("../asssets/data/garage.json", {
                name: this.state.vehName,
                plate: this.state.plate,
                state: this.state.state,
        })
        .then(console.log("submit"))
        .then((response) => console.log(response));
            this.setState(initialState);
        
        }
    };

    render() {
        console.log(this.state);
            return (
            <section className="landing">
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="vehName"
                    placeholder="vehicle name"
                    value={this.state.vehName}
                    onChange={this.handleChangeName} 
                    />
                <input
                    type="text"
                    name="plate"
                    placeholder="plate #" 
                    value={this.state.plate}
                    onChange={this.handleChangePlate}
                    />
                <input
                    type="text"
                    name="state"
                    placeholder="state"
                    value={this.state.state}
                    onChange={this.handleChangeState} 
                    />
                <button onClick={this.handleSubmit}>Add Vehicle</button>
            </form>
        </section>
        );
    }
}

export default AddVehicle;