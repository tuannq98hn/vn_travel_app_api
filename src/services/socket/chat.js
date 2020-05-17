import Message from '../../api/message/model'

module.exports = socket => {
  return data => {
    if (data != null) {
      Message.create({ ...data.chat, sender: data.user })
        .then(chat => {
          socket.emit('chat_status', true)
          socket.broadcast.to(data.room).emit('user_chat', `User ${socket.id}: ${data.chat}`)
        })
        .catch(() => {
          console.log('Error!')
          socket.emit('chat_status', `Send Message Error`)
        })
      // global.io.sockets.to(data.room).emit('user_chat', `User ${socket.id}: ${data}`)
      // socket.broadcast.to(data.room).emit('user_chat', `User ${socket.id}: ${data.chat}`)
    }
  }
}
