const socket = io('https://anonymous-chat-server-9lcd.onrender.com');

const form = document.getElementById('send');
const messageInput = document.getElementById('msg');
const messageContainer = document.querySelector(".container");

var audio = new Audio("notification.mp3");
function scrolltodown(){
    var chatbox = document.querySelector(".container");
    chatbox.scrollTop = chatbox.scrollHeight;
}
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position == 'left')
    {
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})

const name=prompt("Enter your name to join");
socket.emit('new-user-joined', name);
socket.on('user-joined', name=>{
    append(`${name} joined the chat`,'right');
    scrolltodown();
})

socket.on('recieve', data=>{
    console.log(data);
    append(`${data.name}:${data.message}`,'left');
    scrolltodown();
})

socket.on('left', name=>{
    console.log(name);
    append(`${name} left the chat`,'left');
    scrolltodown();
})
