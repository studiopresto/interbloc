import PropTypes, {number, string} from 'prop-types';

export default function Progress({ value }) {
	const floatValue = parseFloat(value);
	return (
		<div className="progress">
			<div className="progress-bar" style={{width: floatValue + '%'}}/>
			<div className="progress-value">{floatValue}%</div>
		</div>
	)
}

Progress.propTypes = {
	value: PropTypes.oneOfType([string, number]).isRequired,
};