import PropTypes from 'prop-types';

export default function ProgressMultiple({ data, label }) {
	if (!!data.length) {
		return (
			<div className="progress progress-multiple">
				{data.map((option, key) => (
					option.value ? (
						<div
							key={key}
							className="progress-multiple-bar"
							style={{ width: option.value + '%'}}>
							{!!label
								? <div
									className={`progress-multiple-label __${label}`}
									style={{ left: option.value <= 50 ? 0 : 'auto' }}>{option.title}</div>
								: null}
						</div>
					) : null
				))}
			</div>
		)
	}
	return null
};

ProgressMultiple.propTypes = {
	data: PropTypes.array.isRequired,
	label: PropTypes.oneOf(['top', 'bottom']),
}
