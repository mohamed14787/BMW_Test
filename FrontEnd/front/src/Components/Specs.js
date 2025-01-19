import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  ...theme.typography.body2,
  borderRadius: "0",
  borderWidth: "",
  justifyContent: "start",
  color: theme.palette.text.secondary,
  padding: theme.spacing(1),
  maxWidth: "600px",
  borderBottom: "1px solid", // Add border-bottom
  borderColor: "#AAA",
  color: "#444",
}));

export default function Specs({ car }) {
  return (
    <Box
      sx={{
        maxWidth: { sm: "600px", md: "960px" }, // Responsive maxWidth
      }}
      style={{ marginLeft: "10%", paddingBottom: "100px" }}
    >
      <Grid
        container
        rowSpacing={1}
        columnSpacing={5}
        justifyContent="flex-start"
      >
        {Object.entries(car)
          .filter(([key]) => key !== "_id")
          .map(([key, value]) => (
            <Grid item lg={6} md={12} sm={12} xs={12} key={key}>
              <Item>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingLeft: "10px",
                  }}
                >
                  <div>
                    <p>{key}</p>
                  </div>
                  <div>
                    <p>{value}</p>
                  </div>
                </div>
              </Item>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
