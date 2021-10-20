import React, { Fragment } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { border, borderRadius, margin } from '@mui/system';

const useStyle = makeStyles({
  message: {
    display: 'flex',
    flexFlow: 'row nowrap',
    margin: '0.5%',
    padding: '1%',
    border: '1px solid blue',
    borderRadius: '5px'
  },
  textName: {
    fontWeight: "bold",
  },
  contentText: {
    marginLeft: '1%'
  }
});

const Chat = ({data}) => {
  const classes = useStyle();
  return (
    <Fragment>
    {
      data.map(message => (
        <Box item key= {message.message_id} className={classes.message}>
          <Typography className={classes.textName}>{message.name +':'}</Typography>
          <Typography className={classes.contentText}>{message.text}</Typography>
        </Box>  
      ))
    }
  </Fragment>
  )
}

export default Chat
