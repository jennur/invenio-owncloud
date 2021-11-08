/*
  Copyright (C) 2021 CERN.

  Invenio-OwnCloud is free software; you can redistribute it and/or modify it
  under the terms of the MIT License; see LICENSE file for more details.
 */

import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { Button, Icon } from 'semantic-ui-react';

import '@ownclouders/file-picker/dist/wc/file-picker.min.js'
import FilePickerModal from './FilePickerModal';
console.log("Owncloud")

ReactDOM.render(
  <FilePickerModal
  trigger={
    <Button type="button">
      <Icon name="cloud" />
      CernBox
    </Button>
  }
  />,
  document.getElementById("file-picker-wrap")
);
