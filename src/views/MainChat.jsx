import { Grid, Box, TextField, Button, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyle = makeStyles({
  chatList: {
    height: "96vh",
  },
  messages: {
    height: "87vh",
  },
});
const MainChat = () => {
  const [body, setBody] = useState({ chatText: "" });
  const classes = useStyle();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  return (
      <Grid container direction="row" alignItems="stretch">
        <Grid item md={3}>
          <Box border={2} className={classes.chatList}> Espacio para los chats </Box>
        </Grid>
        <Grid item container md={9} direction="row">
          <Grid item md={12}>
            <Box border={2} className={classes.messages}>
              Espacio para los mensajes ya en la base de datos
            </Box>
          </Grid>
          <Grid item container md={12} direction="row" alignItems="center">
            <Grid item md={11}>
              <TextField
                id="InputText"
                label="Aa"
                name="chatText"
                fullWidth
                value={body.chatText}
                onChange={handleChange}
              />
            </Grid>
            <Grid item md={1}> 
              <Button>Enviar</Button>
            </Grid> 
          </Grid>
        </Grid>
      </Grid>
  );
};

export default MainChat;
