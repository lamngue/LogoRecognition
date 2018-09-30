import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';

const Logo = () => {
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
 				<div className="Tilt-inner">
 					<img alt={'aphoto'} src={'https://is5-ssl.mzstatic.com/image/thumb/Purple118/v4/b7/df/6d/b7df6d61-e4fa-4db9-5718-66b68e96de28/AppIcon-1x_U007emarketing-0-85-220-0-5.png/246x0w.png'}>
 					</img> 
 				</div>
			</Tilt>
			
		</div>
		)
}
export default Logo;