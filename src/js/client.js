import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
require("../sass/main.scss");
require("file-loader?name=index.html!../index.html");
require("file-loader?name=p5.min.js!../vendor/p5.min.js");

import configureRoutes from './routes';
import { Router, browserHistory } from 'react-router'
import ReactOnRails from 'react-on-rails';

import routing from "./routes"

import store from "./store";
ReactOnRails.registerStore({ store });

const app = document.getElementById('app');

ReactDOM.render(routing, app);