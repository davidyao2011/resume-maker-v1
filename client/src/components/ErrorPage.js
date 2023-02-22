import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="app">
      <h2>
        Please provide your detail. Go back to <Link to="/">Homepage</Link>
      </h2>
    </div>
  );
}
