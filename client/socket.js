import io from 'socket.io-client'
import store, { updateShelf } from './store'
const socket = io.connect("https://95b44327.ngrok.io", { reconnection: true });

socket.on('connect', () => {
  console.log('Connected!')
<<<<<<< HEAD
  socket.on('data', (data) => {
    console.log('data', data)
    store.dispatch(updateShelf(data))
||||||| merged common ancestors
  socket.on('data',(data)=>{
    console.log('data',data)
=======
  socket.on('data',(data)=>{
   // console.log('data',data)
>>>>>>> master
  })
})


// // dispatching an action to click a pic... which can be done using the same camera function as signup
// // but different camera function
// // once we get the promise of the user in store. and dipatch purchased product and amount

export default socket
