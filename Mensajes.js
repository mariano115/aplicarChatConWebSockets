const fs = require("fs");

const getMensajes = async () => {
  let mensajes;
  try {
    mensajes = JSON.parse(await fs.promises.readFile(`./mensajes.txt`, "utf8"));
  } catch (error) {
    mensajes = [];
  }
  return mensajes;
};

const addMensaje = async (mensaje) => {
  let mensajes;
  try {
    try {
      mensajes = JSON.parse(
        await fs.promises.readFile(`./mensajes.txt`, "utf8")
      );
    } catch (error) {
      mensajes = [];
    }
    mensajes.push(mensaje);
    await fs.promises.writeFile(
      `./mensajes.txt`,
      JSON.stringify(mensajes, null, 2)
    );
  } catch (error) {
    console.log("Fallo al añadir un mensaje", error);
  }
};

module.exports = { addMensaje, getMensajes };
