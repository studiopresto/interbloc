import PropTypes from 'prop-types';


export default function SortButton({ label }) {
	return (
		<span className="table-sort">
			<span className="table-sort-icon">
				<svg width="8" height="7" viewBox="0 0 8 7">
					<path d="M3.13397 0.500001C3.51887 -0.166666 4.48113 -0.166667 4.86603 0.5L7.4641 5C7.849 5.66667 7.36788 6.5 6.59808 6.5H1.40192C0.632124 6.5 0.150998 5.66667 0.535898 5L3.13397 0.500001Z" fill="currentColor"/>
				</svg>
				<svg width="8" height="7" viewBox="0 0 8 7">
					<path d="M4.86603 6.5C4.48113 7.16667 3.51887 7.16667 3.13397 6.5L0.535899 2C0.150999 1.33333 0.632124 0.499999 1.40192 0.499999L6.59808 0.5C7.36788 0.5 7.849 1.33333 7.4641 2L4.86603 6.5Z" fill="currentColor"/>
				</svg>
			</span>
			<span className="table-sort-title">{label}</span>
		</span>
	)
}

SortButton.propTypes = {
	label: PropTypes.string.isRequired,
};