import io from 'socket.io-client'

const socket = io('https://16410a46.ngrok.io')

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('data',(data)=>{
    console.log('data',data)
  })
})

// socket.on('data', (data)=>{
//   console.log('data', data)
// })

export default socket
