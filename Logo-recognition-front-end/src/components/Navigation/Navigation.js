import React from 'react';

const Navigation = ({logIn, isSignedIn}) => {
		if(isSignedIn){
			return(<nav style={{display: 'flex',justifyContent:'flex-end'}}>
				<p onClick={() => logIn('signout')} className ='f3 link dim black underline pa3 pointer gold'>Sign out</p>
				<p onClick={() => logIn('delete')} className ='f3 link dim black underline pa3 pointer gold'>Delete Account</p>
			</nav>);
		}
		else{
			return(<nav style={{display: 'flex',justifyContent:'flex-end'}}>
				<p onClick={() => logIn('signIn')} className ='f3 link dim black underline pa3 pointer gold'>Sign in</p>
				<p onClick={() => logIn('register')} className ='f3 link dim black underline pa3 pointer gold'>Register</p>
				<p onClick={() => logIn('delete')} className ='f3 link dim black underline pa3 pointer gold'>Delete Account</p>
			</nav>);
		}
	}
		

export default Navigation;