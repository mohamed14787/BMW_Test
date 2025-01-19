import Grid_ from "./Grid_";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function SearchPage(props) {
  const [rowData, setRowData] = useState(props.rowData);
  const handleBackClick = () => {
    window.history.back(); // Navigate back to the previous page
  };
  useEffect(() => {
    setRowData(props.rowData);
  }, [props]);

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
          marginBottom: "20px",
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
            Search Results
          </h1>
        </div>
      </div>
      <Grid_ rowData={rowData} />
    </div>
  );
}
