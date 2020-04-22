import React, { Component } from 'react';
import axios from 'axios';
import EventTable from './eventTable';

export default class Events extends Component {

    constructor(props) {
        super(props);
        this.state = { eventsCollection: null };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/events')
            .then(res => {
                this.setState({ eventsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    EventTable() {
        if(this.state.eventsCollection !== null){
            return this.state.eventsCollection.map((data, i) => {
                return <EventTable obj={data} key={i} />;
            });
        }
        else{
            return <tr><td>No Data</td></tr>;
        }
    }

    render() {
        return (
            <div className="wrapper-events">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Event Name</td>
                                <td>timestamp</td>
                                <td>__v</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.EventTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
