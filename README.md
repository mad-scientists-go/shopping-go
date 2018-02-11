SMART MART - the revolution in shopping experiences has arrived.

Smart Mart presents a revolutionary implementation of a shopping experience. Facial recognition sensors positioned at entry, exit, and item retreival points allow for a seamless shopping experience that maximizes usability and eliminates waiting in lines entirely. Electric sensors connected to a Raspberry Pi capture item removal and replacement, and facial recognition API's ensure that item retreival is tracked to the correct user. A mobile app allows for live-tracking of user progress through the store at all points through the experience, including live-updates of cart contents, final purchase information, and receipt email. Admin accounts can monitor store proceedings remotely, and users can dispute purchases through the emailed receipt directly. 

Complete application architecture includes three client application using a centralized, deployed server for maintenance of live information transmission. Socket.io is the primary driving force of data transmission. Sequelize and PostgreSQL are utilized for data storage, and front-end application architecture relies on React, Redux, and React-Redux. 

Deployed on: https://smart-mart-server.herokuapp.com/

Shopping go- 

Shopping go is comprised of the central server for the application, as well as the Admin functionality. 

1. Upon signup, user information is stored in the Postgres database. 

2. The database is responsible for maintenance of user information, and emits a socket event to the admin in-store monitoring page with the user's identity upon walkin. Cart contents are also dispatched via sockets to the Admin in store monitoring page. As the user leaves the store, the API verifies their identity, and the server updates their order to create a record of their purchase. 

3. An email is dispatched to the user with their receipt as well as an option to dispute their order on the mobile app.

4. The server also emits socket events to the mobile application to ensure that the user maintains an updated feed of their purchase records and their current activity at all times. 


To Run: 

Once the client applications are running, the server can be accessed and started by visiting the link above. Ensure that routes and database storage is mapped to the link and not to localhost. Secrets must also be updated to contain the keys the user wishes to use for Kairos. 

