import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemButton, ListItemText } from '@mui/material/';

  


const RoomList = ({rooms}) => {

  return (
    <Fragment>
      {
        rooms.map(room => (
          <Link key={room.id} to={ '/chat/' + room.id + '/' + room.name}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={room.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))
      }
    </Fragment>
  )
}

export default RoomList
