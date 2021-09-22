import React from "react";
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
  const classes = useStyle();

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
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            id="outlined-basic"
            label="Contraseña"
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth
            required
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
