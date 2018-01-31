module.exports = (io) => {
  console.log('sockets running')
  io.on('connect', (socket) => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)
    // console.log(socket)

    //data from raspberry pi...
    let arr = []
    socket.on('sensorData', (data) => {
      console.log(data)
      arr.push(data)
      console.log(arr)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
