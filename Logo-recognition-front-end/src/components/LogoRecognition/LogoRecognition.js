import React from 'react';
import './LogoRecognition.css'
const LogoRecognition = ({imageUrl,box}) => {
	return (
		<div className='center'>
			<div className='absolute mt2'>
				<img id="logo" alt="" src={imageUrl} width='500px' height='auto'/>
			<div className="box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
		)
}
export default LogoRecognition;