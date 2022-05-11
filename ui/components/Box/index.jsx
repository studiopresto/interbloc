import PropTypes from 'prop-types';

export default function Box({ children, theme = '' }) {
	return (
		<div className={`box box-theme-${theme}`}>
			{children}
		</div>
	)
}

Box.propTypes = {
	theme: PropTypes.string,
}