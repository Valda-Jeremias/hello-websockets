const socket = io();

document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const message = document.getElementById('msg').value;
  if (!message) return false;
  const nick = document.getElementById('nick').value;
  if (!nick) return false;
  const chatMessage = {
    nick: nick,
    text: message
  };
  socket.emit('chat message', chatMessage);
  // clear input
  document.getElementById('msg').value = '';
  // put message for sender
  const div = document.createElement('div');
  const nickText = document.createElement('span');
  const messageText = document.createElement('span');
  nickText.classList.add('nick');
  nickText.innerHTML = nick;
  messageText.innerHTML = message;
  div.append(nickText);
  div.append(document.createElement('br'));
  div.append(messageText);
  div.classList.add('sent-message');
  document.getElementById('messages').append(div);
  div.scrollIntoView();
  return false;
});

socket.on('chat message', (msg) => {
  const div = document.createElement('div');
  const nick = document.createElement('span');
  const message = document.createElement('span');
  nick.classList.add('nick');
  nick.innerHTML = msg.nick;
  message.innerHTML = msg.text;
  div.append(nick);
  div.append(document.createElement('br'));
  div.append(message);
  div.classList.add('chat-message');
  document.getElementById('messages').append(div);
  div.scrollIntoView();
});