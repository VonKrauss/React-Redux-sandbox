import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
require("!style!css!sass!../sass/main.scss");

import configureRoutes from './routes';
import { Router, browserHistory } from 'react-router'
import ReactOnRails from 'react-on-rails';

import routing from "./routes"
const app = document.getElementById('app');

ReactDOM.render(routing, app);