const express = require('express')
const morgan = require('morgan')
const {Server} = require('socket.io')
const http = require('http')
const cors = require('cors')
const config = require('./config')
const SocketServer = Server

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: 'https://chatfrontend.conextec.com.co/'
    }
})

app.use(cors())
app.use(morgan('dev'))

io.on('connection', (socket) => {
    console.log('socket user id: ',socket.id)
    socket.on('sendMessage', (message) => {
        socket.broadcast.emit('reSendMessage', {
            body:message,
            from: socket.id
        })
    })
})

server.listen(config.PORT)
console.log(`server on port ${config.PORT}`)