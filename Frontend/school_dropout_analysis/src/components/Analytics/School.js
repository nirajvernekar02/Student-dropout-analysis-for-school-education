import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import Chart from "../../chartUtils.js";

const School = () => {
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [schoolDetails, setSchoolDetails] = useState(null);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/school/get-schools"
      );
      const schoolsData = response.data.data.map((school) => ({
        label: school.name,
        value: school._id,
      }));
      setSchools(schoolsData);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  useEffect(() => {
    if (selectedSchool) {
      fetchSchoolDetails(selectedSchool.value);
    }
  }, [selectedSchool]);

  const handleOptionChange = (event, value) => {
    setSelectedSchool(value);
  };

  const fetchSchoolDetails = async (schoolId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/analytics/dropout-ratio/school?schoolId=${schoolId}`
      );
      setSchoolDetails(response.data);
    } catch (error) {
      console.error("Error fetching school details:", error);
    }
  };

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
          schoolDetails ? schoolDetails.school.studentCount : 0,
          schoolDetails ? schoolDetails.school.dropoutStudents : 0,
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
          schoolDetails ? schoolDetails.school.studentCount : 0,
          schoolDetails ? schoolDetails.school.dropoutStudents : 0,
        ],
        backgroundColor: ["#2196f3", "#4caf50"],
        hoverBackgroundColor: ["#2196f3", "#4caf50"],
      },
    ],
  };

  return (
    <div>
      <div className="my-10">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={schools}
          value={selectedSchool}
          onChange={handleOptionChange}
          renderInput={(params) => <TextField {...params} label="School" />}
        />
      </div>
      {schoolDetails && (
        <Grid className="justify-center" container spacing={5}>
          <Grid item md={4} xs={10}>
            <Card style={{ backgroundColor: "#2196f3" }}>
              <CardContent>
                <Typography variant="h6" style={{ color: "#fff" }}>
                  Total Students
                </Typography>
                <Typography variant="h3" style={{ color: "#fff" }}>
                  {schoolDetails.school.studentCount}
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
                  {schoolDetails.school.dropoutStudents}
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
                  {schoolDetails.dropoutRatio}%
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
                <Bar data={barChartData} key={selectedSchool?.value} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={4} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Pie Chart
                </Typography>
                <Pie data={pieChartData} key={selectedSchool?.value} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default School;
