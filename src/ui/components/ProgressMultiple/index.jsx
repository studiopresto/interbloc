import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ProgressMultipleItem from 'ui/components/ProgressMultipleItem/ProgressMultipleItem';

export default function ProgressMultiple({ data, label }) {
	if (!!data.length) {
		return (
			<div className="progress progress-multiple">
				{data.map((option, key) => (
					<Fragment key={key}>
						<ProgressMultipleItem option={option} label={label}/>
					</Fragment>
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
