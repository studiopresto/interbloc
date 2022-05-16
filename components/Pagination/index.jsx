import PropTypes from 'prop-types';
/*
Icons
 */
import ArrowShortIcon from '~ui/icons/ArrowShort';



export default function Pagination({ theme = 'default' }) {

	if (theme === 'rounded') {
		return (
			<div className="pagination pagination-rounded">
				<div className="pagination-item __first">
					<a className="pagination-link" href="#">First</a>
				</div>
				<div className="pagination-list">
					<div className="pagination-item __prev">
						<a className="pagination-link pagination-link-arrow" href="#">
							<ArrowShortIcon/>
						</a>
					</div>
					<span className="color-grey font-secondary-bold">Page 1 of 10000</span>
					<div className="pagination-item __next">
						<a className="pagination-link pagination-link-arrow" href="#">
							<ArrowShortIcon/>
						</a>
					</div>
				</div>
				<div className="pagination-item __last">
					<a className="pagination-link" href="#">Last</a>
				</div>
			</div>
		)
	}

	return (
		<div className="pagination">
			<div className="pagination-item __prev">
				<a className="pagination-link pagination-link-arrow" href="#">
					<ArrowShortIcon/>
				</a>
			</div>
			<div className="pagination-list">
				<div className="pagination-item">
					<a className="pagination-link is-active" href="#">1</a>
				</div>
				<div className="pagination-item">
					<a className="pagination-link" href="#">2</a>
				</div>
				<div className="pagination-item">
					<a className="pagination-link" href="#">3</a>
				</div>
				<div className="pagination-item">
					<a className="pagination-link" href="#">4</a>
				</div>
				<div className="pagination-item">
					<a className="pagination-link" href="#">5</a>
				</div>
			</div>
			<div className="pagination-item __next">
				<a className="pagination-link pagination-link-arrow" href="#">
					<ArrowShortIcon/>
				</a>
			</div>
		</div>
	)
}

Pagination.propTypes = {
	theme: PropTypes.oneOf(['default', 'rounded']),
};