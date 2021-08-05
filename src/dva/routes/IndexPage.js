import React from "react";
import { connect } from "dva";
import { Link } from "dva/router";

function IndexPage() {
  return (
    <div>
      <h1>Yay! Welcome to dva!</h1>
      <div/>
      <ul>
        <li>
          To get started, edit <code>src/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">
            Getting Started
          </a>
        </li>
      </ul>

      <Link to="/example"> go example</Link>
    </div>
  );
}

IndexPage.propTypes = {};

export default connect()(IndexPage);