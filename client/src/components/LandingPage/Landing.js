import React from "react";
import "./Landing.css";

export default function LandingPage() {
  return (
    <div className="container-flex landing__container">
      <div className="container-flex landing-card">
        <div className="col-sm-6 col-m-6 col-lg-4 mainheader landingHeader">
          <h2>"Spontaneity is a meticulously prepared art"</h2>
          <h3>-Oscar Wilde</h3>
        </div>
      </div>
    </div>
  );
}
