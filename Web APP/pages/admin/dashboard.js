import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import router from "next/router";
import Typography from "@mui/material/Typography";

ChartJS.register(ArcElement, Legend, ChartDataLabels);

import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

export default function Dashboard() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(null);
  const [numApplications, setNumApplications] = React.useState("");

  React.useEffect(() => {
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/get_doc_summary.php",
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
        setIsLoading(false);
        if (data.doc[0].reqcode == 2) {
          setData({
            labels: ["Completed", "On Going", "Returned", "Rejected"],
            datasets: [
              {
                data: [
                  parseInt(
                    data.doc[0]["doc_completed"]
                      ? data.doc[0]["doc_completed"]
                      : "0"
                  ),
                  parseInt(
                    data.doc[0]["doc_on_going"]
                      ? data.doc[0]["doc_on_going"]
                      : "0"
                  ),
                  parseInt(
                    data.doc[0]["doc_returned"]
                      ? data.doc[0]["doc_returned"]
                      : "0"
                  ),
                  parseInt(
                    data.doc[0]["doc_rejected"]
                      ? data.doc[0]["doc_rejected"]
                      : "0"
                  ),
                ],
                backgroundColor: [
                  "rgb(214,82,138)",
                  "rgb(252,148,13)",
                  "rgb(255,249,116)",
                  "rgb(108,170,137)",
                ],
              },
            ],
          });
          setNumApplications(data.doc[0]["doc_total"]);
        } else {
          setError("No Applications Found");
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, []);

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
    <div>
      <div style={{ height: "350px", width: "500px", margin: "auto" }}>
        {error ? (
          <Typography component="h1" variant="h4" align="center" my={4}>
            No data found
          </Typography>
        ) : (
          <div>
            <Typography component="h1" variant="h4" align="center" my={4}>
              All Applications: {numApplications}
            </Typography>
            {data ? (
              <Pie
                data={data}
                options={{
                  onClick: function (evt, element) {
                    if (element.length > 0) {
                      switch (element[0].index) {
                        case 0:
                          router.push("view-closed-applications");
                          break;
                        case 1:
                          router.push("view-sent-applications");
                          break;
                        default:
                          break;
                      }
                    }
                  },
                  tooltips: {
                    enabled: false,
                  },
                  plugins: {
                    datalabels: {
                      formatter: function (value, context) {
                        return `${
                          context.chart.data.labels[context.dataIndex]
                        } : ${value}`;
                      },
                      color: function (context) {
                        return "white";
                      },
                    },
                    legend: {
                      labels: {
                        usePointStyle: true,
                      },
                      position: "bottom",
                      onClick: null,
                    },
                  },
                }}
              />
            ) : (
              <></>
            )}

            <Typography component="h1" variant="h4" align="center" my={2}>
              Summary
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
}

Dashboard.layout = Admin;
