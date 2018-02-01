import io from 'socket.io-client'

const socket = io.connect("https://35e2906a.ngrok.io", { reconnection: true });

socket.on('connect', () => {
  console.log('Connected!')
  socket.on('data',(data)=>{
    console.log('data',data)
  })
})


// dispatching an action to click a pic... which can be done using the same camera function as signup 
// but different camera function 
// once we get the promise of the user in store. and dipatch purchased product and amount 

// export default socket
