import PropTypes from 'prop-types';

export default function ErrorBlock({ title = 'Some error' }) {
	return (
		<div className="error-block">
			<p className="color-grey">{title} :(</p>
		</div>
	)
}

ErrorBlock.propTypes = {
	title: PropTypes.string,
};