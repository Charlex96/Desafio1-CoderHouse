import getDAOS from "../daos/daos.factory.js";
const { chatDao } = getDAOS();

export default (io) => {
  io.on("connection", (socket) => {
    console.log("👤 New user connected. Soquet ID : ", socket.id);

    socket.on("new-message", async (message) => {
      chatDao.create(message);
      const messages = await chatDao.getAll();

      socket.emit("refresh-messages", messages);
      socket.broadcast.emit("refresh-messages", messages);
    });

    socket.on("disconnect", () => {
      console.log("User was disconnected");
    });
  });
};
