const express = require("express");
const { Container } = require("./Container");
const { getMensajes, addMensaje } = require("./Mensajes");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8080;
let container = new Container([]);

io.on("connection", async (socket) => {
  console.log("nuevo cliente conectado");
  await getMensajes().then((res) => socket.emit("messages", res));
  socket.emit("products", container.getAll());

  socket.on("new-message", async (data) => {
    const dateMessage = new Date();
    await addMensaje({
      email: data.email,
      text: data.text,
      date:
        dateMessage.toLocaleDateString() +
        " " +
        dateMessage.getHours() +
        ":" +
        dateMessage.getMinutes() +
        ":" +
        dateMessage.getSeconds(),
    });
    io.sockets.emit("messages", await getMensajes());
  });

  socket.on("new-product", (data) => {
    container.addProduct({
      nombre: data.nombre,
      precio: data.precio,
      foto: data.foto,
    });
    io.sockets.emit("products", container.getAll());
  });
});

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("formulario", { productos: container.getAll() });
});

httpServer.listen(PORT, () => console.log("servidor Levantado"));
