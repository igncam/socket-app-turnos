const { io } = require('../server');
const { TicketControl } = require('../clases/ticket-control')

const ticketControl = new TicketControl();


io.on('connection', (client) => {


    client.on('siguienteTicket', (data, callback) => {
        let siguienteT = ticketControl.siguiente()
        console.log(siguienteT);
        callback(siguienteT)
    })


    //emitir un envento estadoActual 
    // {
    // actual:ticketControl.getUtilmoTicket();
    //}

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    })


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {

            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);


        // actulizar cambiar en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })

    })

});