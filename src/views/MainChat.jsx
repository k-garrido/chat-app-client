import { Grid, Box, TextField, Button, makeStyles, List, Typography } from "@material-ui/core";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router";
import { UserContext } from '../UserContext';
import io from 'socket.io-client';
import RoomList from "../components/RoomList";
import Chat from "../components/Chat";
import { getMessagesByID } from '../services/messages';

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

const MainChat = () => {
  const { user, setUser } = useContext(UserContext);
  const [room, setRoom] = useState('');
  const [allRooms, setAllRooms] = useState([]);
  const [message, setMessage] = useState('');
  const [allMessages, setAllMessages] =  useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const classes = useStyle();
  const {room_id, room_name} = useParams();
  console.log(allMessages)

  // Coneccion de socket con nuestro back-end, configuracion de cors.
  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        'Access-Control-Allow-Credentials':true
      },
    });
  }, []);

  const prevRoom = useRef(room_id);
  
  useEffect(() => {
    prevRoom.current = room_id
    console.log(prevRoom.current)
    
    // 3.1 Emitiendo evento para unir usuario a una sala.
    socket.emit('join', room_id);
    return () => {
      console.log(prevRoom.current)
      socket.emit('disconnectSocket', prevRoom.current);
      prevRoom.current = room_id
      setAllMessages([])
  }
  }, [room_id])


  // 2.2 Se escucha el evento el cual nos envia todas las salas de chat ya creadas.
  useEffect(() => {
    socket.on('allRooms', rooms => {
      setAllRooms(rooms)
    })
  }, [])

  //1.3 Se escucha el evento el cual envia a todos los sockets la sala que se ha creada y se agrega a la lista de todas las salas.
  useEffect(() => {
    socket.on('createdRoom', (room) =>{
      setAllRooms([...allRooms, room])
    })
  }, [allRooms])

  // 4.3 Escuchando el evento  el cual entrega el mensaje creado a cierta sala. 
  useEffect(() => {
    socket.on('createdMessage', (message) =>{
      setAllMessages([...allMessages, message])
    })
  }, [allMessages]);

  //  Importando los mensajes antiguos desde postgres.
  // useEffect(() => {
  //   const getData = async () => {
  //   const data = await getMessagesByID(1);
  //   setOldMessages(data.data)
  //   }
  //   getData()
  // }, [])

  // 1.1 Funcion la cual captura los datos ingresados en el input text de las cracion de salas y crea el evento que se envia al servidor.
  const creatingChatRoom = () => {
    socket.emit('createRoom', room);
    setRoom('')
  };

  // 4.1 Funcion la cual captura los datos ingresados en el input text del chat y crea el evento que se envia al servidor.
  const getMessage = () => {
    if (message) {
      socket.emit('sendMessage', message, room_id, user.name, user.id)
    }
    setMessage('')
  };

  return (
      <Grid container direction="row" alignItems="stretch">
        <Grid item container md={3}>
          <Grid container className={classes.chatList} direction="column"> 
            <List>
              <RoomList rooms = {allRooms} />
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
              <Typography variant="h2" color="initial">chat {room_name}</Typography>
              <Chat data = {allMessages} />
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
