import React, { Fragment } from 'react';
import { useParams } from 'react-router';
import {
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

const Chat = ({data}) => {
  const {room_id, room_name} = useParams();
  console.log(data)
  return (
    <Fragment>
    {
      data.map(message => (
        <Grid item key= {message.message_id}>
          <Typography>{message.name +': ' + message.text}</Typography>
        </Grid>  
      ))
    }
  </Fragment>
  )
}

export default Chat
