import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@material-ui/core";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import logo from "../images/logo.jpeg";
import { Grid, Typography } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SingInOut = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid container>
      <Grid container item md={6} alignItems="center">
        <Box sx={{width: "100%",display: "flex", flexDirection: "row", alignItems: "center"}} >
          <img src={logo} className="logo" width="200px" alt=""></img>
          <Box sx={{width: "100%",display: "flex", flexDirection: "column", alignItems: "center"}}>
          <Typography variant="h1" color="initial" sx={{}}> DeveloPlace</Typography>
          <Typography variant="h5" color="#80cbc4" sx={{}}> ChatApp</Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item  md={6}>
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center",}}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Iniciar sesión" {...a11yProps(0)} />
              <Tab label="Registrarse" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <SignIn />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SignUp />
          </TabPanel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SingInOut;
