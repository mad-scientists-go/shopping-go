import io from 'socket.io-client'

const socket = io('https://16410a46.ngrok.io')

socket.on('connect', () => {
  console.log('Connected!')
})

export default socket
