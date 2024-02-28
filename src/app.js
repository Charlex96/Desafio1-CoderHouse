const express = require("express");
const morgan = require("morgan");
const { Server: SocketServer } = require("socket.io");
const http = require("http");
const homeRoutes = require("./routes/mongo/homeRoutes.js");
const productRoutes = require("./routes/mongo/productRoutes.js");
const cartRoutes = require("./routes/fs/cartFsRoutes.js");
const websockets = require("./websockets/websockets.js");
const exphbs = require("express-handlebars");
const homeFsRoutes = require( "./routes/fs/homeFsRoutes.js");
const productFsRoutes = require( "./routes/fs/productFsRoutes.js");
const cartFsRoutes = require( "./routes/fs/cartFsRoutes.js");
const chatRoutes = require( "./routes/mongo/chatRoutes.js");




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
// con FileSystem
app.use("/fs/home", homeFsRoutes);
app.use("/fs/products", productFsRoutes);
app.use("/fs/carts", cartFsRoutes);
// con MongoDB
app.use("/home", homeRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/chat", chatRoutes);


/** ------------------- connection mongoDB ------------------- */

connectMongoDB();

const server = httpServer.listen(PORT, () =>
    console.log(
        `🚀 Server started on port ${PORT}. 
        at ${new Date().toLocaleString()}`
    )
);
server.on("error", (err) => console.log(err));
