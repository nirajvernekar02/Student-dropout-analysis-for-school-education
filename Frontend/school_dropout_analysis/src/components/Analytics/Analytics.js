import React, { useState } from "react";
import Area from "./Area";
import Age from "./Age";
import Caste from "./Caste";
import Gender from "./Gender";
import School from "./School";
import Standard from "./Standard";
import { Button, Stack } from "@mui/material";

const Analytics = () => {
  const [selectedOption, setSelectedOption] = useState("School");
  const [totalStudents, setTotalStudents] = useState(1000); // Placeholder values
  const [dropoutStudents, setDropoutStudents] = useState(100); // Placeholder values
  const [sortData, setSortData] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleButtonClick = (name) => {
    if (sortData === name) {
      setSortData("");
    } else {
      setSortData(name);
    }
  };

  const handleVariantChange = (name) => {
    return sortData === name ? "contained" : "outlined";
  };

  const dropoutRatio = ((dropoutStudents / totalStudents) * 100).toFixed(2);

  const data = [
    { name: "Total Students", value: totalStudents },
    { name: "Dropout Students", value: dropoutStudents },
  ];

  // Component to render based on the sortData state
  const renderComponent = () => {
    switch (sortData) {
      case "School":
        return <School />;
      case "Area":
        return <Area />;
      case "Gender":
        return <Gender />;
      case "Caste":
        return <Caste />;
      case "Age":
        return <Age />;
      case "Standard":
        return <Standard />;
      default:
        return null;
    }
  };

  return (
    <div className="container justify-center" style={{ padding: "20px" }}>
      <h1 className="text-2xl lg:text-5xl font-bold mb-10">Analytics</h1>
      <div>
        <Stack spacing={2} className="justify-center" direction="row">
          <Button
            variant={handleVariantChange("School")}
            onClick={() => handleButtonClick("School")}
          >
            School
          </Button>
          <Button
            variant={handleVariantChange("Area")}
            onClick={() => handleButtonClick("Area")}
          >
            Area
          </Button>
          <Button
            variant={handleVariantChange("Gender")}
            onClick={() => handleButtonClick("Gender")}
          >
            Gender
          </Button>
          <Button
            variant={handleVariantChange("Caste")}
            onClick={() => handleButtonClick("Caste")}
          >
            Caste
          </Button>
          <Button
            variant={handleVariantChange("Age")}
            onClick={() => handleButtonClick("Age")}
          >
            Age
          </Button>
          <Button
            variant={handleVariantChange("Standard")}
            onClick={() => handleButtonClick("Standard")}
          >
            Standard
          </Button>
        </Stack>
      </div>
      {/* <Grid className="justify-center" container spacing={5}>
        <Grid item md={4} xs={10}>
          <Card style={{ backgroundColor: "#2196f3" }}>
            <CardContent>
              <Typography variant="h6" style={{ color: "#fff" }}>
                Total Students
              </Typography>
              <Typography variant="h3" style={{ color: "#fff" }}>
                {totalStudents}
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
                {dropoutStudents}
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
                {dropoutRatio}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid> */}
      {renderComponent()}
    </div>
  );
};

export default Analytics;
