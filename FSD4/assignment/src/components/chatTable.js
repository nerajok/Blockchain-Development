import React, { Component } from 'react';

class ChatTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.Username}
                </td>
                <td>
                    {this.props.obj.chat}
                </td>
                <td>
                    {this.props.obj.chatroom}
                </td>
                <td>
                    {this.props.obj.timestamp}
                </td>
                <td>
                    {this.props.obj.__v}
                </td>
            </tr>
        );
    }
}

export default ChatTable;
