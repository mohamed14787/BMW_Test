import { useParams } from "react-router-dom";
import { DataContext } from "../DataContext";
import { useContext } from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Specs from "./Specs";
import KeySpecs from "./KeySpecs";

export default function CarDetail() {
  const { id } = useParams();
  const { data } = useContext(DataContext);

  const car = data.find((car) => car._id === id);
  const handleBackClick = () => {
    window.history.back();
  };

  if (!car) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
          color: "red",
        }}
      >
        <h2>Car not found</h2>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          padding: "10px",
          backgroundColor: "#283949",
          color: "white",
          display: "flex",
          justifyContent: "start",
          gap: "40%",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            marginleft: "20px",
          }}
          onClick={handleBackClick}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ marginRight: "10px", fontSize: "24px" }} // Increased icon size
          />
        </div>
        <div>
          <h1 style={{ flexGrow: 1, textAlign: "center", margin: 0 }}>
            CAR DETAILS
          </h1>
        </div>
      </div>
      <div style={{ paddingLeft: "10%" }}>
        <div>
          <h1>
            {car.Brand} {car.Model}
          </h1>
        </div>
        <div>
          <h4>Price : {car.PriceEuro} Euros </h4>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            paddingLeft: "10%",
          }}
        >
          <h2>
            {" "}
            {car.Brand} {car.Model} Key Specification
          </h2>
        </div>

        <KeySpecs car={car} />

        <Specs car={car} />
      </div>
    </div>
  );
}
