const express = require("express");
const { postgraphile } = require("postgraphile");
const cors = require("cors");
require("dotenv").config();

const app = express();

const options = {
  origin: process.env.CORS,
  credentials: true,
};

app.use(cors(options));

// Enable pre-flight requests for all routes
app.options("*", cors(options));

console.log(`Postgres URI ${process.env.POSTGRES_URI}`);

app.use(
  postgraphile(process.env.POSTGRES_URI, "public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    disableDefaultMutations: true,
    appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
    pgSettings(req) {
      ssl: {
        rejectUnauthorized: false;
      }
    },
  })
);

app.listen(process.env.PORT || 5000);
