import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { ScrollView } from "@cantonjs/react-scroll-view";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import DocDetail from "components/DocDetail";
import RouteDetail from "components/RouteDetail";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

// layout for this page
import Admin from "layouts/Admin.js";

const theme = createTheme();

export default function SubmittedDocDetail() {
  const { trackingData: data, comments } = useSelector((state) => state);
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState("1");
  const [routeData, setRouteData] = React.useState(null);

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ScrollView style={{ height: "100vh" }}>
        <Container
          component="main"
          maxWidth="xl"
          sx={{ mb: 4 }}
          justifyContent="center"
          alignItems="center"
        >
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
          >
            <Typography
              component="h1"
              variant="h4"
              align="center"
              my={3}
              style={{ textDecoration: "underline" }}
            >
              Submitted Document
            </Typography>
            <DocDetail data={data} />
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
            <React.Fragment>
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
            </React.Fragment>
          </Paper>
        </Container>
      </ScrollView>
    </ThemeProvider>
  );
}

SubmittedDocDetail.layout = Admin;
