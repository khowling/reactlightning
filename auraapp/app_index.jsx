'use strict;'

import './index.html';
import 'babel-core/polyfill';

import React, {Component} from 'react';
import App from "./app.jsx";

 React.render(React.createElement(App), document.getElementById('app'));
