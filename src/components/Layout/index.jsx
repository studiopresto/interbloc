import {useCallback, useState} from 'react';
import Header from 'components/Header';
import VerticalNav from 'components/VerticalNav';

export default function Layout({ children }) {
	
	const [touchStartLocation, setTouchStartLocation] = useState({});
	
	const handleTouchStart = useCallback((e) => {
		const firstTouchEvent = e.touches[0];
		setTouchStartLocation({
			x: firstTouchEvent.clientX,
			y: firstTouchEvent.clientY,
		});
	}, [setTouchStartLocation])
	
	const handleTouchEnd = useCallback((e) => {
		const firstTouchEvent = e.changedTouches[0];
		const location = {
			x: firstTouchEvent.clientX,
			y: firstTouchEvent.clientY
		};
		const differences = {
			x: touchStartLocation.x - location.x,
			y: touchStartLocation.y - location.y
		};
		if (differences.x < 0) {
			document.body.classList.toggle('nav-active');
		}
	}, [touchStartLocation])
	
	return (
		<main id="wrapper">
			<div className="wrapper-layout">
				<div className="wrapper-layout-sidebar" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
					<VerticalNav/>
				</div>
				<div className="wrapper-layout-body">
					<Header/>
					{children}
				</div>
			</div>
		</main>
	)
}