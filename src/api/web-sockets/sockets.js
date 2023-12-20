const { createServer } = require('http')
const { Server } = require('socket.io')

const httpServer = createServer()

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})


io.on('connection', async (socket) => {
    console.log('New user connected', socket.id);

    socket.on('enviarMensaje', (data, callback) => {
        console.log(data);
        // socket.emit('responseEvent', 'Hello Client')
        callback({
            status: 'OK'
        })
    })

    // socket.on('message', (data) => {
    //     console.log(data);
    //     socket.broadcast.emit('message', data);
    // })

    // socket.on('disconnect', () => {
    //     console.log('User disconnected');
    // })

})

httpServer.listen(5000, () => {
    console.log('Server is listening in port 5000');
})