## Smart Mart

Welcome to the last time you'll wait in line!

Smart Mart is a web server that intelligently connects to shelf hardware via websockets and allows a store to be run without any employees!

Using a Raspberry Pi wired up to a motion sensor, Smart Mart can detect which customer is grabbing what item off the shelf at any given time.

Upon entering the store, Smart Mart utilizes Kairos to authenticate user via facial recognition. After authenticated the server creates an order for the customer. Then your companion app updates accordingly to let you know that you're in the store and ready to shop.

The motion sensor connected to the Pi sends an event to the server, the server then sends out another event to let the shelf camera know to take a photograph. The second you grab something off the shelf it snaps a photograph of your face and attaches the charge to the idetified user's order in the database. 

After you are finished shopping you simply walk out. After the person is identified, their cart status is changed to a paid order, and they get an email receipt, along with an option in their order history to dispute a charge if they feel there was a mistake. 


##Requirements: 
  Raspberry Pi (model 2 and above) with motion sensor (sold separately)
  3 cameras - webcams are fine.
  iOS or Android Device

##Setup

The Pi is going to serve as an identifier for what product you are picking up. That is one Pi & sensor for each product. 
After that you have to tune the sensor's distances. It only emits an event on certain values, based on the dimensions of the product.

After you have accounted for the product's size, you will be able to add and remove multiple products and the shelf emits a single event if you grabbed 2 of the same item at the same time. 

Before running the camera client you will need a Kairos account to add and authenticate users by facial recognition. Make an account, plug in the id and key into a file called secrets.js that is in the root directory of the project.

With Kairo setup, next you need to run the camera client application on all your cameras and put them in the preferred mode for each. So you should have 1 shelf camera (per product), one entrance camera, and one exit camera. After the cameras are in their desired states, all you have to do is run them. 

The cameras are set up to detect motion, take photographs and send them to Kairo, so once the cameras are activated, if you walk in with your face in the direction of the camera, you will be authenticated if there is a match, otherwise you will be asked to signup or re-enter the store.

Setup is done! The Smart Mart server will take care of the rest of the work. If you want to connect your own server and database that will require a bit more setup. 