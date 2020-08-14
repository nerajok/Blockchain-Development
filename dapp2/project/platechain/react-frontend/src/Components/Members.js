mport React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
export default class Header extends Component {
  render() {
    return (
    <div className="Logo">
        <Typography color="textSecondary">
            Welcome to
          </Typography>
        <Typography color="primary" variant="display3">
           <button>Organisation 1</button>
	</Typography>
        <br />
        <br />
        <br />
        <Typography color="textSecondary">
            Select an option to begin
          </Typography>
    </div>
    );
  }
}
