import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText } from '@mui/material/';
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
  ancla: {
    width: "100%",
  },
  span: {
    fontSize: "100%",
  },
  icon: {
    marginLeft: '30%'
  },
  leftSide: {
    backgroundColor: '#cfd8dc',
  }
});
  


const RoomList = ({rooms}) => {
  const classes = useStyle();

  return (
    <Fragment>
      {
        rooms.map(room => (
          <Link key={room.id} to={ '/chat/' + room.id + '/' + room.name} className={classes.ancla}>
            <ListItem disablePadding>
              <ListItemButton alignItems= "center" >
                <ListItemText primary={room.name} className={classes.span}/>
              </ListItemButton>
            </ListItem>
          </Link>
        ))
      }
    </Fragment>
  )
}

export default RoomList
