import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('sensorData', (data)=>{
  console.log('data', data)
})

export default socket
