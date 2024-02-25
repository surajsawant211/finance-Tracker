-- first we created folder of project 
-- then we divide a project  mvc pattern folders structure according to the requirements.
-- create server.js file in a root folder
-- then we initialize the package using terminal command => npm init -y  it will create package.json file
-- the package.json file will be generated there will a object called scripts which helps to run application on given command
-- we have to install some dpendencies to run the project like 
express => for rest apis,
colors => us eto style node consoles, 
morgan => this is used to check when url hits how response is getting  to check status,
cors =>
dotenv => install for hiding some confidential data ignoring on github
bodyparser => use to send /parse json data from client to server

-- Then in package.json update some changes in scripts object "server": "nodemon server.js" it helps to prevent restart server again and again.

-- Then we create a basic server in server.js,.env file and initialize things accordingly for ex- express ,middlewares,dotenv ,server listening etc

-- after all configuration run command npm run server

-- then use mongo DB for database connection signup mongodb then create cluster if using first time. the browse collection and create database after creating database connect to mongo db compass based on ur created URL.

-- URL gets from the copass connection copy and paste that url in .env file 
MONG_URL :- mongodb+srv://suraj:suraj9664@cluster0.oei1xko.mongodb.net/financeTrackerApp

-- CREATE FILE in config folder conectDb.js for establishing connection from mongodb database for that install npm i mongoose

-- mongoose will conect the mongodb database npm i mongoose 

-- after establishing the connection export that file an dimport in server.js