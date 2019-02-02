// comando para establecer la comunicacion


var socket = io();

var label = $('#lblNuevoTicket');
var cargando = $('#lblNuevoTicket')
socket.on('connect', function() {
    console.log('Conectado al servidor');
})

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
})


// on 'estadoActual'
socket.on('estadoActual', function(estado) {
    // console.log(estado);
    cargando.text(estado.actual)
})

$('button').on('click', function() {

    console.log('click');

    socket.emit('siguienteTicket', null, function(siguienteTicket) {

        label.text(siguienteTicket)

    });



})