import React from "react";
import Router from "next/router";

export default function Index() {
  React.useEffect(() => {
    if (localStorage.getItem("emp_id")) Router.push("/admin");
    Router.push("/signIn");
  });

  return <div />;
}
