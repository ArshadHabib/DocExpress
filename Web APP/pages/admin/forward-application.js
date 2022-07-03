import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ScrollView } from "@cantonjs/react-scroll-view";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReceivedDocDetail from "../../components/ReceivedDocDetail";
import RouteDetail from "components/RouteDetail";
import CircularProgress from "@mui/material/CircularProgress";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import router from "next/router";
// layout for this page
import Admin from "layouts/Admin.js";
import { useDispatch } from "react-redux";
const theme = createTheme();

export default function ForwardApplication() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.trackingData);
  const [loading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState("");
  const [routeData, setRouteData] = React.useState(null);
  const [status, setStatus] = React.useState("1");

  React.useEffect(() => {
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/get_doc_route.php",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          doc_name: data.doc_name,
          emp_id: localStorage.getItem("emp_id"),
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        data = data.doc;
        data.shift();
        setRouteData(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const handleTrack = (event) => {
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

  const handleSend = (emp_id_receiver) => {
    // Default options are marked with *
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/insert_doc_status.php",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          doc_id: data.doc_id,
          emp_id_sender: localStorage.getItem("emp_id"),
          emp_id_receiver,
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
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollView style={{ height: "100vh" }}>
        <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              my={1}
              style={{ textDecoration: "underline" }}
            >
              Forward Document
            </Typography>
            <ReceivedDocDetail
              data={data}
              sx={{
                marginTop: 5,
              }}
            />
            <Typography component="h1" variant="h6">
              Comments:
            </Typography>
            <TextField
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              id="comments"
              placeholder="Any Note?"
              fullWidth
              multiline={true}
              minRows={3}
              inputProps={{
                style: {
                  fontSize: 20,
                  padding: 3,
                  marginLeft: 3,
                },
              }}
              style={{
                marginBottom: 10,
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Button
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  handleSend(data.starting_emp_id);
                }}
              >
                Send Back to Owner
              </Button>
              <Button
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  handleSend(data.sender_emp_id);
                }}
              >
                Send Back to Sender
              </Button>
              <Button variant="contained" onClick={handleTrack}>
                Track
              </Button>
            </div>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              my={3}
              style={{ textDecoration: "underline" }}
            >
              Further Options
            </Typography>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={status}
                onChange={(e) => {
                  setLoading(true);
                  const routeOption = e.target.value;
                  const api =
                    routeOption == "1"
                      ? "get_doc_route"
                      : "get_doc_customized_route";
                  setStatus(e.target.value);
                  fetch(
                    `http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/${api}.php`,
                    {
                      method: "POST", // *GET, POST, PUT, DELETE, etc.
                      headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                      },
                      body: JSON.stringify({
                        doc_name: data.doc_name,
                        emp_id: localStorage.getItem("emp_id"),
                      }),
                    }
                  )
                    .then((response) => response.json())
                    .then((data) => {
                      data = data.doc;
                      data.shift();
                      setRouteData(data);
                      setLoading(false);
                    })
                    .catch((e) => {
                      console.log(e);
                      setLoading(false);
                    });
                }}
                sx={{ marginLeft: 1 }}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Default Route"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio />}
                  label="Customized Route"
                />
              </RadioGroup>
            </FormControl>
            {!loading ? (
              routeData.map((Data, key) => (
                <div
                  key={key}
                  style={{
                    width: "500px",
                    margin: "auto",
                  }}
                >
                  <RouteDetail
                    data={Data}
                    doc_id={data.doc_id}
                    comments={comments}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Paper>
        </Container>
      </ScrollView>
    </ThemeProvider>
  );
}

ForwardApplication.layout = Admin;
