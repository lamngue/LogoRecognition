const handleRegister = (req,res,db,bcrypt)=>{
	const {email,password,name} = req.body;
	if (!email || !password || !name){
		return res.status(400).json("incorrect form submission")
	}
	var hash = bcrypt.hashSync(req.body.password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: req.body.email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users').returning('*').insert({
		// id and entries are auto generated
			email: loginEmail[0],
			name: req.body.name,
			joined: new Date()
		}).then(response => {
			res.json(response[0]);
			})
		}).then(trx.commit).catch(trx.rollback);
	})
	.catch(err => res.status(400).json('unable to register'));
}

module.exports = {
	handleRegister: handleRegister
}