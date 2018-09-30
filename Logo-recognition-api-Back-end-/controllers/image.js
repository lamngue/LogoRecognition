const Clarifai = require('clarifai');


const app = new Clarifai.App({
 apiKey: 'fd1eeb2b0628432b86cd8f637a6d2037'
}); 

const handleDetectImage = (req,res) => {
	 app.models.predict(Clarifai.LOGO_MODEL, req.body.input)
	 .then(data =>{
	 	res.json(data);
	 })
	 .catch(err => res.status(400).json('unable to work with API') )
}


const handleImage = (req,res,db) =>{
	db('users').where('id', '=', req.body.id)
	.increment('entries',1)
	.returning('entries')
	.then(entries => {
		res.json(entries);
	}).catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleDetectImage: handleDetectImage
}