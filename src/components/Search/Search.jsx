import { React, Component } from "react";
import ViolationsList from "../ViolationsList/ViolationsList";
import axios from "axios";
import './Search.scss';
import Button from 'react-bootstrap/Button';
// import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

const urlKey = "https://data.cityofnewyork.us/resource/nc67-uf89.json";

class Search extends Component {
    state = {
        violations: [],
    };

    handleChangePlate = (e) => {
        this.setState({ plate: e.target.value });
    }
    handleChangeState = (e) => {
        this.setState({ state: e.target.value });
    }

    handleSubmit = (e) => {
            e.preventDefault();
            axios
                .get(`${urlKey}`,
                {
                    params: {
                        plate: this.state.plate,
                        state: this.state.state
                    },
                    headers: {
                        'X-App-Token': '8S7MHDy96yb3fu8863lQfcg8P'
                    }
                })
                .then((res) => {
                    this.setState({violations: res.data});
                    console.log(this.state.violations);
                })
                .catch((err) => console.log(err))
            };

    render() {
        return (
            <section className="landing">
            <div className="card text-center">
                <div className="card-title">
                    TicketWatch
                    <br/>NYC
                </div>                  
                <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <div className="col">
                            <input
                            type="text"
                            name="plate"
                            placeholder="plate #" 
                            value={this.state.plate}
                            onChange={this.handleChangePlate}
                            />
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    name="state"
                                    placeholder="state"
                                    value={this.state.state}
                                    onChange={this.handleChangeState} 
                                    />
                            </div>
                        </div>
                        <Button type="submit">Search Tickets</Button>
                </form>
            {this.state.violations.map((violations) => {
                return (
                    <ViolationsList
                    key={violations.summons_number}
                    summons_number={violations.summons_number}
                    plate={violations.plate}
                    state={violations.state}
                    issue_date={violations.issue_date}
                    violation_time={violations.violation_time}
                    violation={violations.violation}
                    amount_due={violations.amount_due}
                    url={violations.summons_image.url}
                    />
                );
            })}
            </div>
        </section>
        
            );
        }}

export default Search;