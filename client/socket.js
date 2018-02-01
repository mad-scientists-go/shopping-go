import io from 'socket.io-client'

const socket = io.connect('https://6e7e19d9.ngrok.io',{reconnection : true})

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
