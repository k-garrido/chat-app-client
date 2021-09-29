import React, { useState } from "react";
import {
  Avatar,
  Grid,
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { postRequest } from '../services/auth';

const useStyle = makeStyles({
  paperStyle: {
    padding: 10,
    height: "70vh",
    width: "26vw",
  },
  iconStyle: {
    backgroundColor: "#009688",
  },
});

const SingIn = () => {
  const [body, setBody] = useState({ email: "", password: "" });
  const classes = useStyle();
  const handleChange = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

const verifyUser = (e) => {
    postRequest(body)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        window.location = "/";
      })
      .catch((err) => {
        console.error("email o contraseña incorrectos");
      });
  };
  return (
    <Grid container>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid item align="center">
          <Avatar className={classes.iconStyle}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" color="initial">
            Inciar sesión
          </Typography>
        </Grid>
        <form>
          <TextField
            id="emailInput"
            label="Email"
            variant="outlined"
            margin="normal"
            name="email"
            fullWidth
            required
            autoFocus
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
          <Button color="primary" variant="contained" fullWidth onClick={verifyUser}>
            Ingresar
          </Button>
          <Typography variant="body1" color="initial">
            ¿Aun no estas registrado?
            <Link href="#"> Registrate</Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
};

export default SingIn;
