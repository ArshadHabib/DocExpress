import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import router from "next/router";
// @material-ui/core components
import { useDispatch } from "react-redux";

export default function ReceivedDocDetail(props) {
  const { data } = props;
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "STORE_DATA", payload: data });
    router.push("/admin/forward-application");
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        style={{ cursor: "pointer" }}
        onClick={handleSubmit}
      >
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
            value={data.doc_start_date}
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
            value={data.doc_due_date}
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
            value={data.doc_status == "1" ? "Completed" : "On Going"}
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
        <Grid item xs={12} sm={6}>
          <TextField
            id="startedBy"
            name="startedBy"
            label="Started By"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.starting_emp_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="empRank"
            name="empRank"
            label="Rank"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.starting_emp_rank}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="department"
            name="department"
            label="Department"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.starting_dept_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="sentBy"
            name="sentBy"
            label="Sender"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.sender_emp_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="senderEmpRank"
            name="empRank"
            label="Sender Rank"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.starting_emp_rank}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="senderDepartment"
            name="senderDepartment"
            label="Sender Department"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.sender_dept_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="senderNote"
            name="senderNote"
            label="Sender Note"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.sender_note}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
