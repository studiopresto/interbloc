import PropTypes from 'prop-types';



export default function ProgressMultiple({ data, label }) {

	if (!!data.length) {

		// const sortedData = data.sort((a, b) => b.value - a.value);

		return (
			<div className="progress progress-multiple">
				{
					data.map((option, key) => (
						<div key={key} className="progress-multiple-bar" style={{ width: option.value + '%' }}>
							{ !!label ? <div className={`progress-multiple-label __${label}`}>{option.title}</div> : null }
						</div>
					))
				}
			</div>
		)
	}

	return null

};

ProgressMultiple.propTypes = {
	data: PropTypes.array.isRequired,
	label: PropTypes.oneOf(['top', 'bottom']),
}