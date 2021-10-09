import React, { useState } from "react";
import {
  Avatar,
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { LockOutlined } from "@material-ui/icons";
import { createUser } from "../services/users";

const useStyle = makeStyles({
  paperStyle: {
    padding: 10,
    height: "80vh",
    width: "26vw",
  },
  iconStyle: {
    backgroundColor: "#009688",
  },
});

const SingUp = () => {
  const [body, setBody] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState(null);
  console.log(status);
  const classes = useStyle();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };
  const creatingUser = async (e) => {
    try {
      const response = await createUser(body);
      if (response.status === 200) {
        setStatus(true);
      }
      setBody({ name: "", email: "", password: "" })
    } catch (error) {
      setStatus(false);
    }
  };
  const sendMessage = () => {
    if (status === true) {
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Exito</AlertTitle>
            Su cuenta ha sido creada — <strong>Ahora puede iniciar sesion</strong>
          </Alert>
        </Stack>
      );
    } else if (status === false) {
      return (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Email ya registrado — <strong>Vuelva a reintentar</strong>
          </Alert>
        </Stack>
      );
    }
  };
  return (
    <Grid container>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid item align="center">
          <Avatar className={classes.iconStyle}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" color="initial">
            Registro
          </Typography>
        </Grid>
        <form>
          {sendMessage()}
          <TextField
            id="nameInput"
            label="Nombre"
            variant="outlined"
            margin="normal"
            name="name"
            fullWidth
            required
            autoFocus
            value={body.name}
            onChange={handleChange}
          />
          <TextField
            id="emailInput"
            label="Email"
            variant="outlined"
            margin="normal"
            name="email"
            fullWidth
            required
            value={body.email}
            onChange={handleChange}
          />
          <TextField
            id="passwordInput"
            label="Contraseña"
            variant="outlined"
            margin="normal"
            type="password"
            name="password"
            fullWidth
            required
            value={body.password}
            onChange={handleChange}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={creatingUser}
          >
            Unirse
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default SingUp;
