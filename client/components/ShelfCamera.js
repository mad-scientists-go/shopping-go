// import io from 'socket.io-client';
// var socket = io.connect('https://3407e1eb.ngrok.io',{ reconnection: true })

// socket.on('connect',function (socket){
//     console.log('socket is running')
//     socket.on('sensorData',function(data){
//         console.log('sensorData',data)
//     })
// })
// io.on('connect', (socket) => {
//     console.log(`A socket connection to the server has been made: ${socket.id}`)
//     // console.log(socket)

//     //data from raspberry pi...
//     socket.on('sensorData', (data) => {
//       console.log(data)
//     })

//     socket.on('disconnect', () => {
//       console.log(`Connection ${socket.id} has left the building`)
//     })
//   })
// }
