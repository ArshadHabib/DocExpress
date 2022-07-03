import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function DocDetail(props) {
  const { data } = props;
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
            id="empName"
            name="empName"
            label="Employee Name"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.emp_name}
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
            value={data.dept_name}
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
      </Grid>
    </React.Fragment>
  );
}
