const socket = io();

socket.on('message', (message) => {
  console.log(message);
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.target.elements.message.value;
  socket.emit('sendMessage', message, (error) => {
    if(error) {
      return console.log(error);
    }
    console.log('Message delivered');
  });

  event.target.elements.message.value = '';
});

document.querySelector('#send-location').addEventListener('click', () => {
  if(!navigator.geolocation) {
    return alert('Your browser does not support geolocation.');
  }

  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position);
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  });

})






