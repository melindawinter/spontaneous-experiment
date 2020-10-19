import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="mt-auto py-3 fixed-bottom">
        <div className="container pb-2">
          <span className="text-muted">Our Spontaneous Crew</span>
        </div>
        <div className="container">
          <Link to="//github.com/cyrusjose">
            <span className="text-muted px-5">
              <i className="fab fa-github contactIcon"> Cyrus Jose</i>
            </span>
          </Link>
          <Link to="//github.com/melindawinter">
            <span className="text-muted px-5">
              <i className="fab fa-github contactIcon"> Melinda Winter</i>
            </span>
          </Link>
          <Link to="//github.com/katean004">
            <span className="text-muted px-5">
              <i className="fab fa-github contactIcon"> Kate An</i>
            </span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
