import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Box from "@mui/material/Box";
import { ScrollView } from "@cantonjs/react-scroll-view";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OngoingDocDetail from "../../components/OngoingDocDetail";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
// layout for this page
import Admin from "layouts/Admin.js";

const theme = createTheme();

export default function ViewClosedApplications() {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [viewOption, setViewOption] = React.useState("1");
  const [listArray, setListArray] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/get_doc_completed.php",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp_id: localStorage.getItem("emp_id"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.doc[0].reqcode == 2) {
          data = data.doc;
          data.shift();
          setData(data);
          for (let i = 0; i < data.length; i++) {
            const subArr = Object.values(data[i]);
            subArr.splice(4, 0, "none", "Completed");
            setListArray((oldArray) => [...oldArray, subArr]);
          }
        } else {
          setError("No Applications Found");
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollView style={{ height: "100vh" }}>
        <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={viewOption}
                onChange={(e) => {
                  setViewOption(e.target.value);
                }}
                sx={{ marginLeft: 1 }}
              >
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Table View"
                />
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Detailed View"
                />
              </RadioGroup>
            </FormControl>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              my={1}
              style={{ textDecoration: "underline" }}
            >
              {error.length ? error : "My Ongoing Documents"}
            </Typography>
            {viewOption === "1" ? (
              data.map((detail) => (
                <div key={detail.step}>
                  <OngoingDocDetail
                    status={"Completed"}
                    data={detail}
                    sx={{
                      marginTop: 5,
                    }}
                  />
                  <Divider
                    sx={{
                      marginTop: "10px",
                      marginBottom: "20px",
                      borderColor: "black",
                    }}
                  ></Divider>
                </div>
              ))
            ) : (
              <Card>
                <CardBody>
                  <Table
                    tableHeaderColor="info"
                    tableHead={[
                      "Tracking ID",
                      "Document Name",
                      "Start Date",
                      "Due Date",
                      "Attachment",
                      "Status",
                      "Applicant ID",
                      "Applicant Name",
                    ]}
                    tableData={listArray}
                  />
                </CardBody>
              </Card>
            )}
          </Paper>
        </Container>
      </ScrollView>
    </ThemeProvider>
  );
}

ViewClosedApplications.layout = Admin;
