const express = require("express");
const morgan = require("morgan");
const { Server: SocketServer } = require("socket.io");
const http = require("http");
const homeRoutes = require("./routes/homeRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const websockets = require("./websockets/websockets.js");
const exphbs = require("express-handlebars");

/** ------------------- variables ------------------- */
const app = express();
const PORT = 8080 || process.env.PORT;

/** ------------------- server httt & websocket ------------------- */

/** Tenemos dos servidores:  httpServer (http) y io (websocket)*/
const httpServer = http.createServer(app);

/** Crear nuevo servidor websocket */
const io = new SocketServer(httpServer);

websockets(io);

/** ------------------- middlewares -------------------*/
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

/** ------------------- frontend -------------------*/
app.engine("handlebars", exphbs.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

/** ------------------- routes ------------------- */
app.use("/", homeRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);

const server = httpServer.listen(PORT, () =>
    console.log(
        `🚀 Server started on port ${PORT}. 
        at ${new Date().toLocaleString()}`
    )
);
server.on("error", (err) => console.log(err));
