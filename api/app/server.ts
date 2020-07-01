import * as express from "express";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";
import * as helmet from "helmet";
import * as methodOverride from "method-override";
import * as favicon from "serve-favicon";
import * as path from "path";
import * as compression from "compression";
import * as multer from "multer";
import * as uuid from "uuid/v4";
import { __express as handleBars } from "hbs";
import { routes } from "./routes";
import { log, requestLogStream } from "./libraries/Log";
import { config } from "./config/config";
import { createServer } from "http";

export const app = express();
export const server = createServer(app);

//Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, uuid() + path.extname(file.originalname));
  }
});
export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    var filetypes = /pdf/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(
      new Error(
        "Error: File upload only supports the following filetypes - " +
          filetypes
      )
    );
  },
  limits: { files: Infinity }
});
// Security middleware
app.use(helmet());
// Util middleware
app.use(methodOverride());
app.use(favicon(path.join(__dirname, "../public/favicon.ico")));
// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Response compression
app.use(compression());
// use morgan to log requests to the console
app.use(morgan("short", { stream: requestLogStream }));

app.use(express.static(path.resolve(__dirname, "../public")));

app.set("views", `${config.root}/views`);
app.set("view engine", "html");
app.engine("html", handleBars);

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Expose-Headers", "Content-Count");
  next();
});

routes(app);

export function setupServer(): Promise<any> {
  return new Promise((resolve, reject) => {
    server.listen(config.server.port, () => {
      log.info(`back started at port ${config.server.port}`);
      resolve();
    });
  });
}
