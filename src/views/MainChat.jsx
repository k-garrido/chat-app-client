import { Grid, Box, TextField, Button, makeStyles, List } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import io from 'socket.io-client';
import RoomList from "../components/RoomList";
import Chat from "../components/Chat";
const ENDPOINT = 'https://chat-app-kgarrido.herokuapp.com/';
let socket;
const useStyle = makeStyles({
  chatList: {
    height: "96vh",
  },
  messages: {
    height: "87vh",
  },
});
const rooms = [{
  name: 'room1',
  _id: '1'
},
{
  name: 'room2',
  _id: '2'
}]

const MainChat = () => {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] =  useState([]);
  const classes = useStyle();
  const {room_id, room_name} = useParams();

  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        'Access-Control-Allow-Credentials':true
      },
    });
  }, []);

  useEffect(() => {
    socket.on('message', (message) =>{
      setAllMessages([...allMessages, message])
    })
  }, [allMessages])

  const creatingChatRoom = () => {
    socket.emit('createRoom', room);
    console.log(room)
    setRoom('')
  }

  const getMessage = () => {
    console.log(message)
    if (message) {
      socket.emit('sendMessage', message, room_id)
    }
    setMessage('')
  }

  return (
      <Grid container direction="row" alignItems="stretch">
        <Grid item container md={3}>
          <Grid container className={classes.chatList} direction="column"> 
            <List>
              <RoomList rooms = {rooms} />
            </List >
            <Grid item container direction="row" justifyContent="space-between" alignItems="flex-end" >
              <Grid item md={9}>
                <TextField
                  label="Nombre de tu sala"
                  name="roomName"
                  fullWidth
                  value={room}
                  onChange={e => setRoom(e.target.value)}
                />
              </Grid>
              <Grid item md={3}>  
                <Button variant="contained" onClick={creatingChatRoom}>Crear</Button>
              </Grid>
            </Grid>
          </Grid>
         
        </Grid>
        <Grid item container md={9} direction="row">
          <Grid item md={12}>
            <Box border={2} className={classes.messages}>
              <pre>{JSON.stringify(allMessages, null, '\t')}</pre>
              <Chat />
            </Box>
          </Grid>
          <Grid item container md={12} direction="row" alignItems="center">
            <Grid item md={11}>
              <TextField
                label="Aa"
                name="chatText"
                fullWidth
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item md={1}> 
              <Button variant="contained" onClick={getMessage}>Enviar</Button>
            </Grid> 
          </Grid>
        </Grid>
      </Grid>
  );
};

export default MainChat;
