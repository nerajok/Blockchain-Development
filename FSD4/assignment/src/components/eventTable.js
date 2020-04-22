import React, { Component } from 'react';

class EventTable extends Component {
    render() {
        return (
            <tr>
                <td>
                    {this.props.obj._id}
                </td>
                <td>
                    {this.props.obj.event_name}
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

export default EventTable;
