import Room from '../../api/room/model'

module.exports = socket => {
  return data => {
    console.log('Data' + JSON.stringify(data.room))
    console.log('Room Name: ' + data.room.name)
    console.log('Rooms: ' + JSON.stringify(socket.adapter.rooms))
    console.log('Creator: ' + socket.id)
    if (data != null) {
      Room.create({ ...data.room })
        .then(room => {
          socket.join(room.name)
          console.log('Room Data: ' + JSON.stringify(room))
          socket.emit('status_create_room', `Create successfull with room name: ${data.room}`)
        })
        .catch(() => {
          console.log('Error!')
          socket.emit('status_create_room', `Create Fail with room name: ${data.room}`)
        })
    }
  }
}
