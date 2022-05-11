import PropTypes from 'prop-types';



export default function HomeIcon({ color = 'currentColor' }) {
	return (
		<svg width="32" height="27" viewBox="0 0 32 27">
			<path d="M28.2334 13.6363V8.74518H23.6458L15.9999 0.593262L0.708008 16.8971H3.76638V26.6794H12.9415V18.5275H19.0582V26.6794H28.2334V16.8971H31.2917L28.2334 13.6363Z" fill={color}/>
		</svg>
	)
}

HomeIcon.propTypes = {
	color: PropTypes.string,
};