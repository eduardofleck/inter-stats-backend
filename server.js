const express = require("express");
const { postgraphile } = require("postgraphile");
const cors = require("cors");
require("dotenv").config();

const app = express();

const options = {
  origin: process.env.CORS,
};

app.use(cors(options));

// Enable pre-flight requests for all routes
app.options("*", cors(options));

app.use(
  postgraphile(process.env.DATABASE_URL, "public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    disableDefaultMutations: true,
    appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
    enableCors: true,
  })
);

app.listen(process.env.PORT || 5000);