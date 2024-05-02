import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "../../chartUtils.js";

const Caste = () => {
  const [selectedOption, setSelectedOption] = useState("General");
  const [casteData, setCasteData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/analytics/dropout-ratio/caste")
      .then((response) => {
        setCasteData(response.data.casteData);
      })
      .catch((error) => {
        console.error("Error fetching caste data:", error);
      });
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Find the selected caste data
  const selectedCaste = casteData.find(
    (caste) => caste.caste === selectedOption
  );

  // Prepare data for bar chart
  const barChartData = {
    labels: ["Total Students", "Dropout Students"],
    datasets: [
      {
        label: "Count",
        backgroundColor: ["#2196f3", "#4caf50"],
        borderColor: ["#2196f3", "#4caf50"],
        borderWidth: 1,
        hoverBackgroundColor: ["#2196f3", "#4caf50"],
        hoverBorderColor: ["#2196f3", "#4caf50"],
        data: [
          selectedCaste ? selectedCaste.totalStudents : 0,
          selectedCaste ? selectedCaste.dropoutStudents : 0,
        ],
      },
    ],
  };

  // Prepare data for pie chart
  const pieChartData = {
    labels: ["Total Students", "Dropout Students"],
    datasets: [
      {
        data: [
          selectedCaste ? selectedCaste.totalStudents : 0,
          selectedCaste ? selectedCaste.dropoutStudents : 0,
        ],
        backgroundColor: ["#2196f3", "#4caf50"],
        hoverBackgroundColor: ["#2196f3", "#4caf50"],
      },
    ],
  };

  return (
    <div>
      <div className="my-10">
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ minWidth: "120px" }}
        >
          {casteData.map((caste) => (
            <MenuItem key={caste.caste} value={caste.caste}>
              {caste.caste}
            </MenuItem>
          ))}
        </Select>
      </div>
      <Grid className="justify-center" container spacing={5}>
        <Grid item md={4} xs={10}>
          <Card style={{ backgroundColor: "#2196f3" }}>
            <CardContent>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Total Students
              </Typography>
              <Typography variant="h3" style={{ color: "#fff" }}>
                {selectedCaste ? selectedCaste.totalStudents : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={10}>
          <Card style={{ backgroundColor: "#4caf50" }}>
            <CardContent>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Dropout Students
              </Typography>
              <Typography variant="h3" style={{ color: "#fff" }}>
                {selectedCaste ? selectedCaste.dropoutStudents : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={10}>
          <Card style={{ backgroundColor: "#ff9800" }}>
            <CardContent>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Dropout Ratio
              </Typography>
              <Typography variant="h3" style={{ color: "#fff" }}>
                {selectedCaste
                  ? selectedCaste.dropoutRatio.toFixed(4) + "%"
                  : "-"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Bar Chart
              </Typography>
              <Bar data={barChartData} key={selectedOption} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Pie Chart
              </Typography>
              <Pie data={pieChartData} key={selectedOption} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Caste;
