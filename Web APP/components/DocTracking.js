import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function DocTracking(props) {
  const { data } = props;
  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <TextField
            id="step"
            name="step"
            label="Step"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.step}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="recDate"
            name="recDate"
            label="Received Date"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.rec_date}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="empName"
            name="empName"
            label="Employee Name"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.emp_id}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="comments"
            name="comments"
            label="Comments"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.comments}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
