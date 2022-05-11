import PropTypes from 'prop-types';



export default function DirectoryIcon({ color = 'currentColor' }) {
	return (
		<svg width="25" height="19" viewBox="0 0 25 19" fill="none">
			<path d="M0.0869141 18.6021C0.0869141 18.9021 0.395114 19.2021 0.703313 19.2021H24.1265C24.4347 19.2021 24.7429 18.9021 24.7429 18.6021V4.20047C24.7429 3.90043 24.4347 3.6004 24.1265 3.6004H11.9948C11.4737 3.6004 10.9732 3.39699 10.5997 3.03347L8.06606 0.566927C7.69265 0.203409 7.1921 0 6.67096 0H0.703313C0.395114 0 0.0869141 0.300033 0.0869141 0.600066V18.6021Z" fill={color}/>
		</svg>
	)
}

DirectoryIcon.propTypes = {
	color: PropTypes.string,
};