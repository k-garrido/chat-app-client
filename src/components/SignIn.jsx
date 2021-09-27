import React, {useState} from "react";
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
  const [body, setBody] = useState ({ email: '', password: ''});
  const classes = useStyle();

  const handleChange = (e) =>{
    console.log (e.target.value)
    setBody({
      ...body,
      [e.target.name]: e.target.value
    })
  }
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
        <Grid item>
          <TextField
            id="emailInput"
            label="Email"
            variant="outlined"
            margin="normal"
            name= "email"
            fullWidth
            required
            autoFocus
            value = {body.email}
            onChange = {handleChange}
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
            value = {body.password}
            onChange = {handleChange}
          />
          <Button color="primary" variant="contained" fullWidth>
            Ingresar
          </Button>
          <Typography variant="body1" color="initial">
            ¿Aun no estas registrado?
            <Link href="#"> Registrate</Link>
          </Typography>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default SingIn;
