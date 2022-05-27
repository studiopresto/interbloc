import PropTypes from 'prop-types';



export default function InfoIcon({ color = 'currentColor' }) {
	return (
		<svg width="7" height="11" viewBox="0 0 7 11">
			<path d="M0.218 9.32H2.57V5.736H0.386V4.056H4.334V9.32H6.35V11H0.218V9.32ZM4.768 1.998C4.768 2.18467 4.73067 2.362 4.656 2.53C4.59067 2.68867 4.49733 2.82867 4.376 2.95C4.25467 3.062 4.11 3.15533 3.942 3.23C3.78333 3.29533 3.61533 3.328 3.438 3.328C3.25133 3.328 3.07867 3.29533 2.92 3.23C2.76133 3.15533 2.62133 3.062 2.5 2.95C2.37867 2.82867 2.28067 2.68867 2.206 2.53C2.14067 2.362 2.108 2.18467 2.108 1.998C2.108 1.81133 2.14067 1.63867 2.206 1.48C2.28067 1.312 2.37867 1.172 2.5 1.06C2.62133 0.938666 2.76133 0.845333 2.92 0.78C3.07867 0.705333 3.25133 0.668 3.438 0.668C3.61533 0.668 3.78333 0.705333 3.942 0.78C4.11 0.845333 4.25467 0.938666 4.376 1.06C4.49733 1.172 4.59067 1.312 4.656 1.48C4.73067 1.63867 4.768 1.81133 4.768 1.998Z" fill={color}/>
		</svg>
	)
}

InfoIcon.propTypes = {
	color: PropTypes.string,
};