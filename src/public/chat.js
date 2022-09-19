var socket = io()
const form = document.querySelector('.form')
const input = document.querySelector('#input')
const message = document.querySelector('.chat')

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(input.value) {
        socket.emit('chat message', input.value)
        input.value = '';
    }

});

socket.on('chat message', (msg) => {
    var item = document.createElement('li');
    item.innerHTML = msg
    message.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})