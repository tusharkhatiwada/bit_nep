import React, { Component } from "react";
import axios from "axios";

class Today extends Component {
    state = {
        todaysRate: 0
    };
    componentDidMount() {
        this.fetchTodayRate();
    }
    fetchTodayRate = () => {
        axios({
            method: "GET",
            url: "https://api.coindesk.com/v1/bpi/currentprice/NPR.json"
        })
            .then(response => {
                const rate = response.data.bpi.NPR.rate_float;
                this.setState({
                    todaysRate: rate
                });
            })
            .catch(err => {
                console.log("Error fetching rate: ", err);
            });
    };
    render() {
        return (
            <div>
                <h1>Today's rate of Bitcoin</h1>
                <h3>{`Rs. ${this.state.todaysRate}`}</h3>
            </div>
        );
    }
}

export default Today;
