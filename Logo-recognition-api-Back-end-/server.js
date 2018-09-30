//ECHO is on.
const express = require('express');
const app = express();
const bodyParser =  require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex')
const signin = require('./controllers/signin')
const register = require('./controllers/register')
const profile = require('./controllers/profile')
const image = require('./controllers/image')
const clear = require('./controllers/clear')
const db= knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'lamd3pz4i',
    database : 'smart-brain'
  }
});

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	],
	login:[
		{
			id: '987',
			hash: '',
			email: 'john@gmail.com'
		}
	]
}


app.get('/',(req,res)=>{
	res.send(database.users)
});

app.post('/signin', signin.handleSignIn(db,bcrypt));

app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});

// get an user's profile
app.get('/profile/:id', (req,res) => {profile.handleProfile(req,res,db)});

//update the user's entry count for each image submission
app.put('/image', (req,res) => {image.handleImage(req,res,db)});

//delete a user's account
app.delete('/delete', (req,res) => {clear.handleClear(req,res,db)});

//respond to front-end the api
app.post('/imageurl' , (req,res) => {image.handleDetectImage(req,res)});

app.listen(3000,() => {
	console.log('app is running on port 3000')
});

/*
/ --> res = this is working
/signin --> post = success/failure
/register --> POST = user
/profile/:userID --> GET = user
/image --> put : update score/ update user profile --> updated
user object
/delete --> delete: delete account
*/
