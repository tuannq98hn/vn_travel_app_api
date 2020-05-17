import Room from '../../api/room/model'

module.exports = socket => {
  return data => {
    Room.findById(data.room)
      .then(room => {
        if (room) {
          room
            .set({ member: [...room.member, data.user] })
            .save()
            .then(r => {
              socket.emit('join_room_status', true)
              if (r.member.length) {
                socket.broadcast.to(r.id).emit('update_room', r.member)
              }
            })
        } else {
          socket.emit('join_room_status', false)
        }
      })
      .catch(() => {
        console.log('Error!')
        socket.emit('join_room_status', false)
      })
  }
}
