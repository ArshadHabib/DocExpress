import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ScrollView } from "@cantonjs/react-scroll-view";
import Dropdown from "react-dropdown";
import dropdownStyle from "react-dropdown/style.css";
import moment from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReceivedDocDetail from "../../components/ReceivedDocDetail";
import ReceivedDocTable from "components/ReceivedDocTable/ReceivedDocTable.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

// layout for this page
import Admin from "layouts/Admin.js";
import deptNames from "../../deptNames";

const theme = createTheme();

export default function ViewReceivedApplications() {
  const [data, setData] = React.useState([]);
  const [wholeData, setWholeData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [dept, setDept] = React.useState("");
  const [error, setError] = React.useState("");
  const [startDate, setStartDate] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [viewOption, setViewOption] = React.useState("1");
  const [listArray, setListArray] = React.useState([]);

  React.useEffect(() => {
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/get_doc_received.php",
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
          setWholeData(data);
          let subArr;
          for (let i = 0; i < data.length; i++) {
            subArr = [];
            subArr[0] = data[i].doc_id;
            subArr[1] = data[i].doc_name;
            subArr[2] = data[i].doc_start_date;
            subArr[3] = data[i].doc_due_date;
            subArr[4] = "none";
            subArr[5] = data[i].doc_status == "1" ? "Completed" : "On Going";
            subArr[6] = data[i].app_id;
            subArr[7] = data[i].app_name;
            subArr[8] = data[i].starting_emp_name;
            subArr[9] = data[i].starting_emp_rank;
            subArr[10] = data[i].starting_dept_name;
            subArr[11] = data[i].sender_emp_name;
            subArr[12] = data[i].sender_emp_rank;
            subArr[13] = data[i].sender_dept_name;
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

  const applyDeptFilter = (filterValue) => {
    if (filterValue == "All") {
      setData(wholeData);
      return;
    }
    const filteredData = wholeData.filter(
      (record) => record.sender_dept_name == filterValue
    );
    setData(filteredData);
  };

  const applyStartDate = (filterValue) => {
    if (!filterValue) return;
    let filteredData;
    if (dueDate) {
      filteredData = data.filter(
        (record) =>
          moment(record.doc_start_date).format("LL") ==
          moment(filterValue).format("LL")
      );
    } else {
      filteredData = wholeData.filter(
        (record) =>
          moment(record.doc_start_date).format("LL") ==
          moment(filterValue).format("LL")
      );
    }
    setData(filteredData);
  };

  const applyDueDate = (filterValue) => {
    if (!filterValue) return;
    let filteredData;
    if (dueDate) {
      filteredData = data.filter(
        (record) =>
          moment(record.doc_due_date).format("LL") ==
          moment(filterValue).format("LL")
      );
    } else {
      filteredData = wholeData.filter(
        (record) =>
          moment(record.doc_due_date).format("LL") ==
          moment(filterValue).format("LL")
      );
    }
    setData(filteredData);
  };

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
    <LocalizationProvider dateAdapter={DateAdapter}>
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
                {error.length ? error : "Received Documents"}
              </Typography>
              {viewOption === "1" ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      width: "80%",
                    }}
                  >
                    <div
                      style={{
                        flexDirection: "column",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 800,
                      }}
                    >
                      <Typography>Filter By Sender Department:</Typography>
                      <Dropdown
                        styles={dropdownStyle}
                        style={{
                          width: 800,
                        }}
                        options={deptNames}
                        value={dept}
                        onChange={(name) => {
                          setDept(name.label);
                          applyDeptFilter(name.label);
                        }}
                        placeholder={"Select an option"}
                      />
                    </div>
                    <div
                      style={{
                        flexDirection: "column",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 800,
                      }}
                    >
                      <Typography>Filter By Start Date:</Typography>
                      <DatePicker
                        inputFormat="DD-MMM-YY"
                        value={startDate}
                        onChange={(e) => {
                          setStartDate(e);
                          applyStartDate(e);
                        }}
                        renderInput={(props) => <TextField {...props} />}
                      />
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setStartDate("");
                          applyDueDate(dueDate);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                    <div
                      style={{
                        flexDirection: "column",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 800,
                      }}
                    >
                      <Typography>Filter By Due Date:</Typography>
                      <DatePicker
                        inputFormat="DD-MMM-YY"
                        value={dueDate}
                        onChange={(e) => {
                          setDueDate(e);
                          applyDueDate(e);
                        }}
                        renderInput={(props) => <TextField {...props} />}
                      />
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          setDueDate("");
                          applyStartDate(startDate);
                        }}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                  {data.map((detail) => (
                    <div key={detail.step}>
                      <ReceivedDocDetail
                        status={"On Going"}
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
                  ))}
                </>
              ) : (
                <Card>
                  <CardBody>
                    <ReceivedDocTable
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
                        "Started By",
                        "Rank",
                        "Department",
                        "Sender",
                        "Rank",
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
    </LocalizationProvider>
  );
}

ViewReceivedApplications.layout = Admin;
