import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router";
import { UserContext } from "../UserContext";
import { Grid, Box, TextField, Button, makeStyles, List, Typography,} from "@material-ui/core";
import ForumSharpIcon from "@material-ui/icons/ForumSharp";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTheme, styled } from "@material-ui/styles";
import io from "socket.io-client";
import RoomList from "../components/RoomList";
import Chat from "../components/Chat";
import logo from "../images/logo.jpeg";

const ENDPOINT = "https://chat-app-kgarrido.herokuapp.com/";
let socket;
const useStyle = makeStyles({
  chatList: {
    height: "50%",
    flex: "1 1 auto"
  },
  messages: {
    height: "87vh",
  },
  icon: {
    marginLeft: "30%",
  },
  mainContainer: {
    height: "100vh",
  },
  leftSide: {
    backgroundColor: "#212121",
    display: "flex",
    flexFlow: "column nowrap"
  },
  ul: {
    width: "100%",
  },
  createRoom: {
    padding: "5%",
  },
  createMessage: {
    padding: "0% 1% 0% 1%",
  },
  buttonMessage: {
    display: "flex",
    justifyContent: "center",
  },
  welcomeText: {
    color: "white"
  }
});

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#80cbc4",
    },
    "&:hover fieldset": {
      borderColor: "#80cbc4",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#80cbc4",
    },
  },
});

const MainChat = () => {
  const { user, setUser } = useContext(UserContext);
  const [room, setRoom] = useState("");
  const [allRooms, setAllRooms] = useState([]);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [oldMessages, setOldMessages] = useState([]);
  const classes = useStyle();
  const { room_id, room_name } = useParams();
  const theme = useTheme();

  // Coneccion de socket con nuestro back-end, configuracion de cors.
  useEffect(() => {
    socket = io(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        "Access-Control-Allow-Credentials": true,
      },
    });
  }, []);

  const prevRoom = useRef(room_id);

  useEffect(() => {
    prevRoom.current = room_id;
    console.log(prevRoom.current);

    // 3.1 Emitiendo evento para unir usuario a una sala.
    socket.emit("join", room_id);
    return () => {
      console.log(prevRoom.current);
      socket.emit("disconnectSocket", prevRoom.current);
      prevRoom.current = room_id;
      setAllMessages([]);
    };
  }, [room_id]);

  // 2.2 Se escucha el evento el cual nos envia todas las salas de chat ya creadas.
  useEffect(() => {
    socket.on("allRooms", (rooms) => {
      setAllRooms(rooms);
    });
  }, []);

  //1.3 Se escucha el evento el cual envia a todos los sockets la sala que se ha creada y se agrega a la lista de todas las salas.
  useEffect(() => {
    socket.on("createdRoom", (room) => {
      setAllRooms([...allRooms, room]);
    });
  }, [allRooms]);

  // 4.3 Escuchando el evento  el cual entrega el mensaje creado a cierta sala.
  useEffect(() => {
    socket.on("createdMessage", (message) => {
      setAllMessages([...allMessages, message]);
    });
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
    socket.emit("createRoom", room);
    setRoom("");
  };

  // 4.1 Funcion la cual captura los datos ingresados en el input text del chat y crea el evento que se envia al servidor.
  const getMessage = () => {
    if (message) {
      socket.emit("sendMessage", message, room_id, user.name, user.id);
    }
    setMessage("");
  };
  // Funcion para cerrar sesión.
  const logout = () => {
    console.log('cerrando');
    window.localStorage.removeItem('token');
    window.location = "/";
  }

  return (
    <Grid container direction="row" alignItems="stretch" className={classes.mainContainer}>
      <Grid item container md={3} className={classes.leftSide}>
        <Box  sx= {{height: "13.6%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} border= {1}>
          <Typography variant="body1" className= {classes.welcomeText}>¡Bienvenid@ {user.name}!</Typography>
          <IconButton aria-label="delete" onClick= {logout}>
            <LogoutIcon sx={{ color: "white", }} />
          </IconButton>
        </Box>
        <Grid container direction="row" alignItems="center">
          <Grid item md={2} alignItems="center" justifyContent="center">
            <ForumSharpIcon color="primary" className={classes.icon} />
          </Grid>
          <Grid item md={10}>
            <Typography variant="h4" color="primary" gutterBottom>
              Listado de salas
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.chatList} direction="column" alignItems="center">
          <List className={classes.ul}>
            <RoomList rooms={allRooms} />
          </List>
        </Grid>
        <Grid container>
          <Grid item container direction="row" justifyContent="space-between" alignItems="flex-end" className={classes.createRoom}>
            <Grid item md={8}>
              <CssTextField
                label="Nombre de tu sala"
                name="roomName"
                fullWidth
                variant="outlined"
                value={room}
                InputLabelProps={{
                  style: {
                    color: "white",
                  },
                }}
                color="primary"
                onChange={(e) => setRoom(e.target.value)}
              />
            </Grid>
            <Grid item md={3}>
              <Button variant="contained" color="primary" onClick={creatingChatRoom}>
                Crear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container md={9} direction="row">
        <Grid item md={12}>
          <Box border={1} className={classes.messages} sx={{}}>
            <Box>
              
            </Box>
            <Box border={1} sx={{  p: 1,  display:"flex"}}>
              <Box sx={{ width: "70%", display:"flex", alignItems: "center",  }}>
                <Typography variant="h5" > Sala {room_name}</Typography>
              </Box>
              <Box sx={{ display:"flex", alignItems: "center", justifyContent: "flex-end", width: "30%" }}>
                <img src={logo} className="logo" width="70px" alt=""></img>
                <Box sx={{ display:"flex",flexDirection: "column", alignItems: "center", }}>
                  <Typography variant="h6" >
                    DeveloPlace
                  </Typography>
                  <Typography variant="body2" color= "primary" sx={{}}>
                    Chat app
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Chat data={allMessages} />
          </Box>
        </Grid>
        <Grid
          item
          container
          md={12}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.createMessage}
        >
          <Grid item md={10}>
            <TextField
              label="Aa"
              name="chatText"
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
          <Grid item md={2} className={classes.buttonMessage}>
            <Button variant="contained" color="primary" onClick={getMessage}>
              Enviar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MainChat;
