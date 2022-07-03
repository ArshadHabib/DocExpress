import * as React from "react";
import router from "next/router";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

export default function RouteDetail(props) {
  const { data, doc_id, comments } = props;

  const handleForward = () => {
    let forward = confirm(`Send Document to ${data.emp_name}`);
    if (forward) {
      fetch(
        "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/insert_doc_status.php",
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: JSON.stringify({
            doc_id,
            emp_id_sender: localStorage.getItem("emp_id"),
            emp_id_receiver: data.emp_id,
            comments,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.doc[0].reqcode == "2") {
            router.push("/admin/dashboard");
            alert(data.doc[0].reqmsg);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        style={{ cursor: "pointer" }}
        onClick={handleForward}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            id="stepId"
            name="stepId"
            label="Serial No."
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.doc_step_no}
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
            id="empRank"
            name="empRank"
            label="Employee Rank"
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
            label="Department Name"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={data.dept_name}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="sent"
            name="sent"
            label="Already Sent?"
            variant="standard"
            fullWidth
            InputProps={{ style: { fontSize: 20 }, disableUnderline: true }}
            InputLabelProps={{ style: { fontSize: 25 } }}
            value={"No"}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
