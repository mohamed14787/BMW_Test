import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import SpeedIcon from "@mui/icons-material/Speed";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import PowerIcon from "@mui/icons-material/Power";
import BoltIcon from "@mui/icons-material/Bolt";
import AirlineSeatReclineNormalIcon from "@mui/icons-material/AirlineSeatReclineNormal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f2f2f2",
  ...theme.typography.body2,
  borderRadius: "0",
  textAlign: "left",
  color: "black",
  fontFamily: "Open-sans, sans-serif",
  fontSize: "16px",
  padding: theme.spacing(1),
  maxWidth: "290px",
  paddingBottom: "5px",
  borderColor: "black",
  border: "3px ",
}));

export default function KeySpecs({ car }) {
  return (
    <Box
      sx={{ maxWidth: { sm: "600px", md: "870px" } }}
      style={{ marginLeft: "10%" }}
    >
      <Grid container spacing={0} justifyContent="flex-start">
        <Grid item sm={6} md={4} xs={6}>
          <Item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SpeedIcon />
              <p style={{ marginLeft: "8px" }}>Top Speed</p>
            </Box>
            <p style={{ fontWeight: "bold" }}>{car.TopSpeed_KmH}</p>
          </Item>
        </Grid>
        <Grid item sm={6} md={4} xs={6}>
          <Item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DirectionsCarIcon />
              <p style={{ marginLeft: "8px" }}>Body Style</p>
            </Box>
            <p style={{ fontWeight: "bold" }}>{car.BodyStyle}</p>
          </Item>
        </Grid>
        <Grid item sm={6} md={4} xs={6}>
          <Item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FlashOnIcon />
              <p style={{ marginLeft: "8px" }}>Rapid Charge</p>
            </Box>
            <p style={{ fontWeight: "bold" }}>{car.RapidCharge}</p>
          </Item>
        </Grid>
        <Grid item sm={6} md={4} xs={6}>
          <Item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AirlineSeatReclineNormalIcon />
              <p style={{ marginLeft: "8px" }}>Seats Number</p>
            </Box>
            <p style={{ fontWeight: "bold" }}>{car.Seats}</p>
          </Item>
        </Grid>
        <Grid item sm={6} md={4} xs={6}>
          <Item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <PowerIcon />
              <p style={{ marginLeft: "8px" }}>Plug Type</p>
            </Box>
            <p style={{ fontWeight: "bold" }}>{car.PlugType}</p>
          </Item>
        </Grid>
        <Grid item sm={6} md={4} xs={6}>
          <Item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <BoltIcon />
              <p style={{ marginLeft: "8px" }}>Acceleration Per Second</p>
            </Box>
            <p style={{ fontWeight: "bold" }}>{car.AccelSec}</p>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
