const socket = io.connect();

socket.on("messages", (data) => {
  console.log("data", data);
  render(data);
});

function render(data) {
  const html = data
    .map((elemento) => {
      return `<div>
                <strong style='color:blue'>${elemento.author}</strong>:
                <em>${elemento.text}</em></div>
        `;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

function addMessage(e) {
  const mensaje = {
    author: document.getElementById("username").value,
    text: document.getElementById("texto").value,
  };

  socket.emit("new-message", mensaje);
  return false;
}
