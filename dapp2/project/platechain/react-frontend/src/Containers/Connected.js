import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

function ContainedButtons(props) {
  const { classes } = props;
  
  const onClickHandler = () => {
    window.alert(`connected to server with socket ID ${props.socketID}`)
  }

  return (
	<div>
	<div>
	<Button variant="contained" color="blue" style={{right:"80%",color:"blue"}} className={classes.button}>
	Organization 1
      </Button>
<Button variant="contained" color="blue" style={{right:"80%",color:"blue"}} className={classes.button}>
        Organization 2
      </Button>
<Button variant="contained" color="blue" style={{right:"80%",color:"blue"}} className={classes.button}>
        Organization 3
      </Button>
<Button variant="contained" color="blue" style={{right:"80%",color:"blue"}} lassName={classes.button}>
        Organization 4
      </Button>
	</div>
    <div>
      <Button variant="contained" color="secondary" style={{left:"65%"}} disabled={!props.connected} className={classes.button} onClick={onClickHandler}>
        {props.connected ? "Connected" : "Disconnected"}
      </Button>
    </div>
</div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContainedButtons);
