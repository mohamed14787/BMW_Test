import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CarDetail from "./Components/CarDetail";
import { DataProvider } from "./DataContext";
import { ThemeProvider, createTheme } from "@mui/material";
import React, { useEffect, useState, useContext, useRef } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeAlpine } from "ag-grid-community";
import "@ag-grid-community/styles/ag-theme-alpine.css";
import { DataContext } from "./DataContext";
import Grid_ from "./Components/Grid_";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import SearchPage from "./Components/SearchPage";

ModuleRegistry.registerModules([AllCommunityModule]);
const myTheme = themeAlpine.withParams({ accentColor: "red" });

function App() {
  const theme = createTheme();
  const [rowData, setRowData] = useState([]);
  const { data, loading } = useContext(DataContext); // Use DataContext to get data and loading status
  const searchTerm = useRef(null);
  const [filteredData, setFilteredData] = useState([]);
  // Update rowData when data is fetched
  useEffect(() => {
    if (!loading) {
      setRowData(data);
    }
  }, [loading]);

  const handleClick = () => {
    const term = searchTerm.current.value;
    console.log(searchTerm);
    fetch(`http://localhost:5005/cars/search/${term}`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredData(data);
        console.log("a7a");
      });
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {loading ? ( // Show loading spinner or message while data is being loaded
          <div style={{ textAlign: "center", marginTop: "20%" }}>
            <p>Loading data...</p>
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <div
                    style={{
                      display: "flex",
                      padding: " 0px",
                      backgroundColor: "#283949",
                      color: "white",
                      justifyContent: "Center",
                    }}
                  >
                    <h1 style={{ flexGrow: 1, textAlign: "center", margin: 7 }}>
                      Available Cars
                    </h1>
                  </div>

                  <form
                    style={{
                      marginTop: "15px",
                      marginBottom: "15px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onSubmit={handleClick}
                  >
                    <TextField
                      id="search-bar"
                      className="text"
                      label="Search for a brand"
                      variant="outlined"
                      placeholder="Search..."
                      size="small"
                      inputRef={searchTerm}
                    />
                    <IconButton type="submit" aria-label="search">
                      <Link to="/grid">
                        <SearchIcon
                          onClick={handleClick}
                          style={{ fill: "blue" }}
                        />
                      </Link>
                    </IconButton>
                  </form>

                  <Grid_ rowData={rowData} />
                </div>
              }
            />
            <Route
              path="/grid"
              element={<SearchPage rowData={filteredData} />}
            />
            <Route path="/cardetail/:id" element={<CarDetail />} />
          </Routes>
        )}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
