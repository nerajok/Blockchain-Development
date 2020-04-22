import React, { Component } from 'react';
import axios from 'axios';
import ChatTable from './chatTable';

export default class Chats extends Component {

    constructor(props) {
        super(props);
        this.state = { chatsCollection: null };
    }

    componentDidMount() {
        axios.get('http://localhost:3000/chats')
            .then(res => {
                this.setState({ chatsCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    ChatsTable() {

        if(this.state.chatsCollection !== null){
            return this.state.chatsCollection.map((data, i) => {
                return <ChatTable obj={data} key={i} />;
            });
        }
        else{
            return <tr><td>No Data</td></tr>;
        }
        
    }

    render() {
        return (
            <div className="wrapper-users">
                <div className="container">
                    <table className="table table-striped table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <td>ID</td>
                                <td>Username</td>
                                <td>chat</td>
                                <td>chatroom</td>
                                <td>timestamp</td>
                                <td>__v</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.ChatsTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
