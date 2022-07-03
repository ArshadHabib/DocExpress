import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "components/CustomButtons/Button.js";
import router from "next/router";
// @material-ui/core components
import { useDispatch } from "react-redux";

export default function OngoingDocDetail(props) {
  const { data } = props;
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Default options are marked with *
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/get_doc_detail.php",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          doc_id: data.doc_id,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.doc[0].reqcode == "2" || data.doc[0].reqcode == "3") {
          setErrorMessage(data.doc[0].reqmsg);
        } else {
          dispatch({ type: "STORE_DATA", payload: data.doc });
          router.push("/admin/tracking");
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="trackingId"
            name="trackingId"
            label="Tracking ID"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.doc_id}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="docName"
            name="docName"
            label="Document Name"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.doc_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="docStartDate"
            name="docStartDate"
            label="Start Date"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.start_date}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="docDueDate"
            name="docDueDate"
            label="Due Date"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.end_date}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="docAttachment"
            name="docAttachment"
            label="Attachment"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 0 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={" "}
          />
          <AttachFileIcon />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="docStatus"
            name="docStatus"
            label="Status"
            variant="standard"
            value={props.status}
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="appId"
            name="appId"
            label="Applicant ID"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.app_id}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button color="success" onClick={handleSubmit}>
            Track
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="appName"
            name="appName"
            label="Applicant Name"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.app_name}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
