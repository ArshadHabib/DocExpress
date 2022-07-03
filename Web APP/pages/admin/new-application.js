import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Dropdown from "react-dropdown";
import dropdownStyle from "react-dropdown/style.css";
// layout for this page
import Admin from "layouts/Admin.js";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
// Date Picker
import moment from "moment";
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useFileUpload } from "use-file-upload";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import router from "next/router";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

export default function NewApplication() {
  const [isLoading, setLoading] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [docName, setDocName] = React.useState("");
  const minDate = Date.now();
  const [date, setDate] = React.useState(minDate);
  const [appId, setAppId] = React.useState("");
  const [status, setStatus] = React.useState("2");
  const [attachment, setAttachment] = useFileUpload();
  const [comments, setComments] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(true);
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/get_doc_names.php",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          id: "1",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data = data.doc;
        for (let i = 1; i < data.length; i++) {
          setOptions((options) => [...options, data[i]["doc_name"]]);
        }
        setDocName(data[1]["doc_name"]);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/insert.php",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          doc_name: docName,
          emp_id: localStorage.getItem("emp_id"),
          app_id: appId,
          doc_due_date: moment(date).format("DD-MM-YYYY").toString(),
          doc_attachment: "1",
          doc_status: status,
          comments,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        if (data.doc[0].reqcode == "2") {
          dispatch({ type: "COMMENTS", payload: comments });
          dispatch({ type: "STORE_DATA", payload: data.doc[1] });
          router.push("/admin/submitted-doc-detail");
        }
      })
      .catch((e) => console.log(e));
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>New Application</h4>{" "}
            </CardHeader>
            {/* This "CardBody" Contains all the Items of NewApplication */}
            <CardBody>
              <GridContainer>
                <GridItem xs={12}>
                  <Dropdown
                    styles={dropdownStyle}
                    options={options}
                    value={docName}
                    onChange={(name) => {
                      setDocName(name.label);
                    }}
                    label={"Application Type"}
                  />
                </GridItem>
                <GridItem xs={12} style={{ marginTop: 10 }}>
                  <Typography component="h1" variant="h6">
                    Applicant ID:
                  </Typography>
                  <TextField
                    id="applicantId"
                    placeholder="Applicant ID"
                    fullWidth
                    inputProps={{
                      style: { fontSize: 20, padding: 3, marginLeft: 3 },
                    }}
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} style={{ marginTop: 10 }}>
                  <Typography component="h1" variant="h6">
                    Due Date:
                  </Typography>
                  <DatePicker
                    inputFormat="DD-MM-YYYY"
                    value={date}
                    onChange={(e) => {
                      setDate(e);
                    }}
                    minDate={moment(minDate)}
                    renderInput={(props) => <TextField {...props} />}
                  />
                </GridItem>
                <GridItem xs={12} style={{ marginTop: 10 }}>
                  <FormControl>
                    <Typography component="h1" variant="h6">
                      Status:
                    </Typography>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                      sx={{ marginLeft: 1 }}
                    >
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="On Going"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Completed"
                      />
                    </RadioGroup>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} style={{ marginTop: 10 }}>
                  <Typography component="h1" variant="h6">
                    Attachment:
                  </Typography>
                  <AttachFileIcon onClick={setAttachment} />
                </GridItem>
                <GridItem xs={12} sx={{ marginTop: 10 }}>
                  <Typography component="h1" variant="h6">
                    Comments:
                  </Typography>
                  <TextField
                    onChange={(e) => setComments(e.target.value)}
                    id="comments"
                    placeholder="Any Note?"
                    fullWidth
                    multiline={true}
                    minRows={3}
                    inputProps={{
                      style: { fontSize: 20, padding: 3, marginLeft: 3 },
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>

            {/* This "CardFooter" Contains Forward Application Button  */}
            <CardFooter style={{ justifyContent: "space-around" }}>
              <Button color="info">Save for draft</Button>
              <Button color="info" onClick={handleSubmit}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </LocalizationProvider>
  );
}

NewApplication.layout = Admin;
