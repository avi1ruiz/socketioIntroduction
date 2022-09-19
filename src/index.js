import express from "express"
import morgan from "morgan";
import { Server } from "socket.io";
import path from 'path'
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Inicializar express
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(morgan('dev'))

// Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

// Inicializar servidor
const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
})

const io = new Server(server)

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', (msg) => {
        //console.log(msg)
        io.emit('chat message', msg)
    })
})






