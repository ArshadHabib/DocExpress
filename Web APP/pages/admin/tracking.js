import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import { ScrollView } from "@cantonjs/react-scroll-view";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DocDetail from "components/DocDetail";
import { useSelector } from "react-redux";
import DocTracking from "../../components/DocTracking";

// layout for this page
import Admin from "layouts/Admin.js";

const theme = createTheme();

export default function Tracking() {
  const data = useSelector((state) => state.trackingData);
  const docDetails = data[0];
  data.shift();
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
              Document Detail
            </Typography>
            <DocDetail data={docDetails} />
            <Typography
              component="h1"
              variant="h4"
              align="center"
              my={3}
              style={{ textDecoration: "underline" }}
            >
              Document Tracking
            </Typography>
            {data.length ? (
              <React.Fragment>
                {data.map((detail) => (
                  <div
                    key={detail.step}
                    style={{
                      width: "500px",
                      margin: "auto",
                    }}
                  >
                    <DocTracking
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
              </React.Fragment>
            ) : (
              <p>No tracking data available</p>
            )}
          </Paper>
        </Container>
      </ScrollView>
    </ThemeProvider>
  );
}

Tracking.layout = Admin;
