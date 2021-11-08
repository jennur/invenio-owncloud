/*
  Copyright (C) 2021 CERN.

  Invenio-OwnCloud is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";

import FilePicker from './FilePicker';

console.log("Owncloud")

let wrapper = document.getElementById("file-picker-wrap");
let token = wrapper && wrapper.getAttribute("data-token");

ReactDOM.render(
  <FilePicker token={token}/>,
  wrapper
);
