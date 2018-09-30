import React from 'react';

const ErrorPage = ({logIn}) => {
	return (
		<div>
			<p className = 'f1'> ERROR LOGGING IN, THE CREDENTIALS PROVIDED ARE NOT CORRECT </p>
			<p onClick={() => logIn('signIn')} className ='f3 link dim black underline pa3 pointer gold'>Back to Sign In</p>
		</div>
		)
}

export default ErrorPage;