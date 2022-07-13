import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import routes from './routes';
import Dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';

const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors())

Dotenv.config()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false}))

app.set("port", 3001)

app.use('/', routes)

/* sockets */

io.on('connection', (socket) => {
  // console.log('a user connected')

  socket.on('join', (room) => {
    socket.join(room)
  })

  socket.on('AdminJoinInChat', (room) => {
    io.to(room).emit('AdminJoinInChat')
  })

  socket.on('sendmessage', ({ message, roomChat, roomAdmin, topic }) => {
    io.to(roomAdmin).emit('newconversation', { message, topic })
  })

  socket.on('answermessage', ({ message, room }) => {
    io.to(room).emit('AnswerMessage', message )
  })

  socket.on('newconversation', (room) => {
    io.to(room).emit('newconversation')
  })

  socket.on('leave room', (room) => {
    // console.log('leaving room...')
    socket.leave(room)
  })

  socket.on('disconnect', () => {
    // console.log('chao papá')
  })
})

server.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
})
