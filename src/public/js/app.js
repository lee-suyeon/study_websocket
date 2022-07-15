const socket = new WebSocket(`ws://${window.location.host}`); // 현재 위치 지정

socket.addEventListener("open", () => {
  console.log("✅ Connected to Server");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data,);
});

socket.addEventListener("close", () => {
  console.log("Connected from Server ❌")
})

setTimeout(() => {
  socket.send("hello from the browser!");
}, 10000)