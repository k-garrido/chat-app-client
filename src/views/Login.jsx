import React from 'react';
import { Avatar, Grid, makeStyles, Paper, Typography, TextField, Button, Link } from '@material-ui/core';

import { LockOutlined } from '@material-ui/icons';

const useStyle = makeStyles({
  paperStyle:{
    padding: 10,
    height: '70vh',
    width: '26vw',
    margin: '20px auto'
  },
  iconStyle:{
    backgroundColor: '#009688'
  }
})

const Login = () => {
  const classes = useStyle();

  return ( 
   <Grid>
     <Paper elevation={10} className={classes.paperStyle}>
        <Grid align= 'center'> 
        <Avatar className= {classes.iconStyle}><LockOutlined /></Avatar>
        <Typography variant="h5" color="initial">Inciar sesión</Typography>
        </Grid>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth required/>
        <TextField id="outlined-basic" label="Contraseña" variant="outlined" type= 'password' fullWidth required/>
        <Button color= 'primary' variant= 'contained' fullWidth> Ingresar </Button>
        <Typography variant="body1" color="initial">
          ¿Aun no estas registrado?
          <Link href= '#'> Registrate</Link>
        </Typography>
     </Paper>
   </Grid>
  )
}

export default Login
