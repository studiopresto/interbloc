import PropTypes from 'prop-types';

export default function Progress({ value }) {
	return (
		<div className="progress">
			<div className="progress-bar" style={{width: value + '%'}}/>
			<div className="progress-value">{value}%</div>
		</div>
	)
}

Progress.propTypes = {
	value: PropTypes.number.isRequired,
};