# CRUD-with-NodeJS-ExpressJS-MongoDB
C.R.U.D. Application using Node.JS, Express.JS and MongoDB. Frontend: HTML/CSS. Other components: EJS engine, Jquery, Bootbox, Bootstrap...
This project would not be possible without Daily Tuition on YouTube. I strongly advice you to check their content as it is beyond perfect: https://www.youtube.com/channel/UCrG2Z0usOCCdUTAr4D1A8mw


Usage notes:

1. This project uses MongoDB atlas which is NOT localhost and therefore in your .env file right below your "PORT=" you must create a variable for mongoDB and specify your username and password within it in order to connect it to your desired database in mongo.

2. If you are editing or running the project within VSC, be sure that you have necessary plug-ins that the project requires and that they are up-to-date.

3. localhost:3000 is the default port for this project defined in the config.env file.

4. the .env file is missing the mongoDB connection variable on purpose to not expose my connection and for you to build your version however you wish.
5. The server will always CRASH if you don't change the config.env string into a running available mongoDB connection path.
6. The variable should be in this format (example): 
MONGO_URI=mongodb+srv://myAdminName:MySuperSecretPassword@cluster0.xhiwc.mongodb.net/Cluster0?retryWrites=true&w=majority

