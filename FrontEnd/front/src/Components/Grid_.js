import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeAlpine } from "ag-grid-community";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../DataContext";
import { useContext, useRef } from "react";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import ReplayIcon from "@mui/icons-material/Replay";

ModuleRegistry.registerModules([AllCommunityModule]);
const myTheme = themeAlpine.withParams({ accentColor: "red" });

export default function Grid_(props) {
  const [rowData, setRowData] = useState(props.rowData);

  const filterInputRef = useRef(null);
  const filterType = useRef("startsWith");
  const [lastDeleted, setLastDeleted] = useState(null);

  const handleFilterClick = (props) => {
    const field = props;
    let filterValue = filterInputRef.current.value;
    const curremtFilterType = filterType.current.value;
    if (!filterValue || filterValue === "") {
      filterValue = "x";
    }

    fetch(
      `http://localhost:5005/cars/filter/${field}/${curremtFilterType}/${filterValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        setRowData(data);
      });
  };

  const handleCanceSearch = () => {
    setRowData(props.rowData);
  };

  useEffect(() => {
    setRowData(props.rowData);
  }, [props.rowData]);
  const handleDelete = (row) => {
    setLastDeleted(row);
    axios.delete(`http://localhost:5005/cars/${row._id}`).then((res) => {
      console.log("Record deleted successfully!");
      setRowData(rowData.filter((r) => r._id !== row._id));
    });
  };

  const handleUndo = () => {
    if (lastDeleted) {
      axios.post("http://localhost:5005/cars/add", lastDeleted).then((res) => {
        console.log("Record added successfully!");
        setRowData([...rowData, lastDeleted]);
        setLastDeleted(null);
      });
    }
  };
  const ActtionComponent = (props) => {
    return (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => handleDelete(props.data)}
          color="error"
        >
          Delete
        </Button>
        <Link to={`/cardetail/${props.data._id}`}>
          <Button startIcon={<PreviewIcon />}>View</Button>
        </Link>
      </div>
    );
  };

  const filterModel = (props) => {
    return (
      <div
        style={{
          width: "250px",
          height: "70px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div>
          <select ref={filterType}>
            <option value="startsWith">Starts with</option>
            <option value="endsWith">Ends with</option>
            <option value="contains">Contains</option>
            <option value="equals">Equals</option>
            <option value="isEmpty">Is empty</option>
          </select>
          <input type="text" ref={filterInputRef} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            paddingRight: "10px",
          }}
        >
          <button onClick={() => handleFilterClick(props)}>Apply filter</button>
          <button onClick={handleCanceSearch}>Cancel</button>
        </div>
      </div>
    );
  };

  const columnDefs = [
    { headerName: "BRAND", field: "Brand", filter: () => filterModel("Brand") },
    { headerName: "Model", field: "Model", filter: () => filterModel("Model") },
    {
      headerName: "Accel. (sec)",
      field: "AccelSec",
      filter: () => filterModel("AccelSec"),
    },
    {
      headerName: "Top Speed (km/h)",
      field: "TopSpeed_KmH",
      filter: () => filterModel("TopSpeed_KmH"),
    },
    {
      headerName: "Range (km)",
      field: "Range_Km",
      filter: () => filterModel("Range_Km"),
    },
    {
      headerName: "Efficiency (Wh/Km)",
      field: "Efficiency_WhKm",
      filter: () => filterModel("Efficiency_WhKm"),
    },
    {
      headerName: "Fast Charge (km/h)",
      field: "FastCharge_KmH",
      filter: () => filterModel("FastCharge_KmH"),
    },
    {
      headerName: "Rapid Charge",
      field: "RapidCharge",
      filter: () => filterModel("RapidCharge"),
    },
    {
      headerName: "Power Train",
      field: "PowerTrain",
      filter: () => filterModel("PowerTrain"),
    },
    {
      headerName: "Plug Type",
      field: "PlugType",
      filter: () => filterModel("PlugType"),
    },
    {
      headerName: "Body Style",
      field: "BodyStyle",
      filter: () => filterModel("BodyStyle"),
    },
    {
      headerName: "Segment",
      field: "Segment",
      filter: () => filterModel("Segment"),
    },
    { headerName: "Seats", field: "Seats", filter: () => filterModel("Seats") },
    {
      headerName: "Price (EUR)",
      field: "PriceEuro",
      filter: () => filterModel("PriceEuro"),
    },
    { headerName: "Date", field: "Date", filter: () => filterModel("Date") },
    {
      headerName: "Action",
      cellRenderer: ActtionComponent,
    },
  ];

  return (
    <div theme={myTheme} style={{ height: "600px", width: "100%" }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />

      <div
        style={{
          padding: "30px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          color="primary"
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={handleUndo}
        >
          Undo
        </Button>
      </div>
    </div>
  );
}
