import {useCallback} from 'react';
import PropTypes from 'prop-types';
import {isEmptyObject} from 'utils/object/detectEmptyObject';

export default function SortButton({ label, sort = {}, value = '', onSort }) {
	
	const isActiveSorting = !isEmptyObject(sort) && sort.order_by === value;
	
	const handleSort = useCallback(() => {
		onSort({
			order_by: value,
			order_direction: sort.order_direction === 'asc' ? 'desc' : 'asc'
		});
	}, [onSort]);
	
	return (
		<span className="table-sort" onClick={handleSort}>
			<span className="table-sort-icon" data-direction={isActiveSorting ? sort.order_direction : null}>
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
	label: PropTypes.string,
	sort: PropTypes.shape({
		order_by: PropTypes.string.isRequired,
		order_direction: PropTypes.oneOf(['asc', 'desc'])
	}).isRequired,
	value: PropTypes.string.isRequired,
	onSort: PropTypes.func.isRequired
};