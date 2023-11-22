// Entry point for the app

// Express is the underlying that atlassian-connect-express uses:
// https://expressjs.com
import express from "express";

// https://expressjs.com/en/guide/using-middleware.html
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import errorHandler from "errorhandler";
import morgan from "morgan";

// Use Handlebars as view engine:
// https://npmjs.org/package/express-hbs
// http://handlebarsjs.com
import hbs from "express-hbs";

// We also need a few stock Node modules
import http from "http";
import path from "path";
import os from "os";

// Routes live here; this is the C in MVC
import routes, { 
  accountRouters,
  tourGuideRouters,
} from "./back-end/routes";
require("dotenv").config();
// Bootstrap Express
const app = express();

// See config.json
const port = 8000;
app.set("port", port);

// Log requests, using an appropriate formatter by env
const devEnv = app.get("env") === "development";
app.use(morgan(devEnv ? "dev" : "combined"));

// We don't want to log JWT tokens, for security reasons
morgan.token("url", redactJwtTokens);

// Configure Handlebars
const viewsDir = path.join(__dirname, "views");
const handlebarsEngine = hbs.express4({ partialsDir: viewsDir });
app.engine("hbs", handlebarsEngine);
app.use("/dist", express.static(path.join(__dirname, "/dist")));
app.set("view engine", "hbs");
app.set("views", viewsDir);

// Include request parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Gzip responses when appropriate
app.use(compression());

// Mount the static files directory
const staticDir = path.join(__dirname, "public");
app.use(express.static(staticDir));

// Show nicer errors in dev mode
if (devEnv) app.use(errorHandler());

// Wire up routes
routes(app);
accountRouters(app);
tourGuideRouters(app);

// Boot the HTTP server
http.createServer(app).listen(port, () => {
  console.log("App server running at http://" + os.hostname() + ":" + port);
});

function redactJwtTokens(req) {
  const url = req.originalUrl || req.url || "";
  const params = new URLSearchParams(url);
  let redacted = url;
  params.forEach((value, key) => {
    if (key.toLowerCase() === "jwt") {
      redacted = redacted.replace(value, "redacted");
    }
  });
  return redacted;
}
