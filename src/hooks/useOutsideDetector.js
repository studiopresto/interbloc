import {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';


function outsideDetector(ref, onClick) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				onClick();
			}
		}
			document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref]);
}

export default function UseOutsideDetector({ children, onClickAway }) {
	const wrapperRef = useRef(null);
	outsideDetector(wrapperRef, onClickAway);

	return <div ref={wrapperRef}>{children}</div>
}

UseOutsideDetector.propTypes = {
	children: PropTypes.element.isRequired,
	onClickAway: PropTypes.func.isRequired,
};

