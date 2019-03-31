import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import axios from "axios";
import xml2js from "xml2js";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";

import App from "../web/containers/App";
import reducers from "../web/reducer";

const endpoint = "https://www.goodreads.com";
const key = "XXXXXXXXXXXX";
const app = express();
app.use(express.static("public"));

/**
 * Method to generate server side rendered component
 */
const renderPageHtml = () => {
  const store = createStore(reducers, applyMiddleware(thunkMiddleware));
  return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Book Search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="main.css" />
    </head>
    <body>
        <div id="root">${renderToString(
          <Provider store={store}>
            <App />
          </Provider>
        )}
        </div>
        <script type="text/javascript" src="bundle.js"></script>
    </body>
    </html>`;
};

const makeApiRequest = (url, res) => {
  axios({
    method: "get",
    url: url,
    responseType: "document"
  }).then(function(response) {
    const parser = new xml2js.Parser();
    parser.parseString(response.data, function(err, data) {
      res.send(data);
    });
  });
};

/**
 * Generate server side rendered page
 */
app.get("/", function(req, res) {
  const pageHTML = renderPageHtml();
  res.send(pageHTML);
});

app.get("/search", (req, res) => {
  const { q: query } = req.query;
  const url = `${endpoint}/search/index.xml?q=${query}&key=${key}`;
  makeApiRequest(url, res);
});

app.get("/book", (req, res) => {
  const { id } = req.query;
  const url = `${endpoint}/book/show.xml?id=${id}&format=xml&key=${key}`;
  makeApiRequest(url, res);
});

/* Port and listening info below */
/* might want to set up argv for easily changing the port */
var port = 3303;
app.listen(port, function() {
  console.log("app listening on port: " + port);
});
