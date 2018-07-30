import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

const today = moment().format("YYYY-MM-DD");

class History extends Component {
    state = {
        fromDate: today,
        toDate: today,
        rateList: []
    };
    displayRate = () => {
        const { fromDate, toDate } = this.state;
        axios
            .get(
                `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=NPR`
            )
            .then(response => {
                const rates = response.data.bpi;
                const rateList = [];
                for (let rate in rates) {
                    rateList.push({
                        date: rate,
                        amount: rates[rate]
                    });
                }
                // console.log("RateList: ", rateList);
                this.setState({
                    rateList: rateList
                });
            })
            .catch(err => {
                console.log("Error fetching rate: ", err);
            });
    };
    renderRateTable = () => {
        const { rateList } = this.state;

        return rateList.map(rate => {
            const date = moment(rate.date).format("ddd, MMM DD, YYYY");
            return (
                <tr key={rate.date}>
                    <td>{date}</td>
                    <td>{`Rs. ${rate.amount}`}</td>
                </tr>
            );
        });
    };
    render() {
        const { fromDate, toDate } = this.state;
        return (
            <div>
                <div>
                    <label htmlFor="fromDate">From</label>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={event => this.setState({ fromDate: event.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="toDate">To</label>
                    <input
                        type="date"
                        value={toDate}
                        onChange={event => this.setState({ toDate: event.target.value })}
                    />
                </div>
                <button onClick={this.displayRate}>Display Rate</button>
                <div>
                    <table style={{ width: 500 }}>
                        <thead>
                            <tr>
                                <th style={{ color: "red", width: 100 }}>Date</th>
                                <th style={{ color: "blue", width: 100 }}>Rate</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderRateTable()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default History;
