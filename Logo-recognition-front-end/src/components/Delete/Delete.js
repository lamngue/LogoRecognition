import React from 'react';

class Delete extends React.Component{
	constructor(props){
		super(props);
		this.state ={
			deleteEmail: ''
		}
	}

	onEmailChange = (event)=>{
		this.setState({deleteEmail: event.target.value})
	}

	onDeleteAccount = () => {
		fetch("https://thawing-dawn-92259.herokuapp.com/delete",{
			method: 'delete',
			// headers is an object
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.deleteEmail,
			})
		}).then(response => response.json())
		.then(user => {
			if(user.email){
				alert('Account deleted!!');
			}else{
				alert('Invalid email');
			}
		}
		)
	}

	render(){
		return(<article className="br4 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
	<main className="pa4 black-80">
  <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Delete an account</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Input email here</label>
        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
    </fieldset>
    <div className="">
      <input onClick={this.onDeleteAccount} 
      className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
      type="submit" 
      value="Delete"/>
    </div>
  </div>
</main>
</article>);
	}
}

export default Delete;