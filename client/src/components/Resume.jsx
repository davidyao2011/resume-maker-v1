import React from "react";
import ErrorPage from "./ErrorPage";

export default function Resume({ result }) {
  // if(JSON.stringify(result) = "{}") {
  //   return <ErrorPage/>
  // }
  // function handlePrint() {
  //   return console.log('print is done successfully.');
  // }
  return (
    <>
      <button onclick={handlePrint}>Print Page</button>
      <main className="container">
        <p>Done!</p>
      </main>
    </>
  );
}
