import { create, index, show, update, destroy } from '../../api/room/controller'
import Room from '../../api/room/model'

var indexSocket = socket => {
  console.log('co ket noi')
  socket.emit('login', {
    message: 'Welcome to BTS Social'
  })

  socket.on('create_room', require('./room.js')(socket))
  socket.on('chat_room', require('./chat.js')(socket))
  socket.on('join_room', require('./joinroom.js')(socket))
  // socket.on('join_room', data => {
  //   socket.join(data)
  //   socket.emit('join_success', `Jointed ${data}`)
  // })

  socket.on('disconnect', data => {
    socket.emit('user_disconnect: ' + socket.id)
    // socket.broadcast.to(data.room).emit('removeUser', userId)

    socket.leave(data.room)

    // Room.findById(data.room)
    //   .then(room => {
    //     if (room) {
    //       room
    //         .set({ member: [...room.member, data.user] })
    //         .save()
    //         .then(r => {
    //           socket.leave(room.id)
    //           if (r.member.length) {
    //             socket.broadcast.to(r.id).emit('removeUser', r.member)
    //           }
    //         })
    //     }
    //     socket.emit('join_room_status', 'Room title does exist.')
    //     return null
    //   })
    //   .catch(() => {
    //     console.log('Error!')
    //     socket.emit('join_room_status', `Join Fail with room name: ${data.room}`)
    //   })
  })
}

module.exports = indexSocket
