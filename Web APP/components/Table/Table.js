import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import router from "next/router";
// @material-ui/core components
import { useDispatch } from "react-redux";
// core components
import styles from "assets/jss/nextjs-material-dashboard/components/tableStyle.js";

export default function CustomTable(props) {
  const dispatch = useDispatch();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;

  const handleSubmit = (doc_id) => {
    // Default options are marked with *
    fetch(
      "http://127.0.0.1:8080/http://84fc-39-40-81-97.ngrok.io/fyp/mobile/get_doc_detail.php",
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          doc_id,
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
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow
                key={key}
                className={classes.tableBodyRow}
                style={{
                  cursor: "pointer",
                }}
                onClick={(event) => {
                  event.preventDefault();
                  handleSubmit(prop[0]);
                }}
              >
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};
