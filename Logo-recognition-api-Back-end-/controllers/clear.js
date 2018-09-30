const handleClear = (req,res,db)=>{
	db('users').where('email', '=', req.body.email)
	.del()
	.returning('*')
	.then(user=> {
		if(user){
			return res.json(user[0]);
		}else{
			return res.status(400).json("unable to get user")
		}
	}) 
	.catch(err => res.status(400).json("unable to get user"));
}

module.exports = {
	handleClear:handleClear
}