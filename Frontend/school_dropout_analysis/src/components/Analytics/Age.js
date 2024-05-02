import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

const Age = () => {
  const [selectedOption, setSelectedOption] = useState("School1");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <div className="my-20">
        <Select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ minWidth: "120px" }}
        >
          <MenuItem value="School1">School1</MenuItem>
          <MenuItem value="School2">School2</MenuItem>
          <MenuItem value="School3">School3</MenuItem>
          <MenuItem value="School4">School4</MenuItem>
          <MenuItem value="School5">School5</MenuItem>
          {/* <MenuItem value="location">location wise</MenuItem> */}
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
                1000
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
                100
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
                10%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Age;
