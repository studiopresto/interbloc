import PropTypes from 'prop-types';



export default function BurgerIcon({ color = 'currentColor' }) {
	return (
		<svg width="24" height="18" viewBox="0 0 24 18" fill="none">
			<path d="M23.3871 0H11.6934V2.57006H23.3871V0Z" fill={color}/>
			<path d="M23.3876 7.70996H0V10.28H23.3876V7.70996Z" fill={color}/>
			<path d="M23.3876 15.4204H5.19727V17.9905H23.3876V15.4204Z" fill={color}/>
		</svg>
	)
}

BurgerIcon.propTypes = {
	color: PropTypes.string,
};