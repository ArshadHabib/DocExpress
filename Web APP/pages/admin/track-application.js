/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CardFooter from "components/Card/CardFooter.js";
import styles from "assets/jss/nextjs-material-dashboard/views/iconsStyle.js";
import Button from "components/CustomButtons/Button.js";
import router from "next/router";
import { Alert, AlertTitle } from "@mui/material";
import { useDispatch } from "react-redux";

export default function TrackApplication() {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [id, setId] = React.useState();
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(id);
    // Default options are marked with *
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/get_doc_detail.php",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          doc_id: id,
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
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Track Application</h4>
              <p className={classes.cardCategoryWhite}>Tracking ID </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <div style={{ margin: "auto" }}></div>
                <GridItem xs={12} sm={12} md={12}>
                  <CustomInput
                    labelText="Enter Tracking ID"
                    id="first-name"
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="success" onClick={handleSubmit}>
                Track
              </Button>
              {errorMessage ? (
                <Alert severity="error" variant="outlined">
                  <AlertTitle>Error</AlertTitle>
                  {errorMessage}
                </Alert>
              ) : null}
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

TrackApplication.layout = Admin;
