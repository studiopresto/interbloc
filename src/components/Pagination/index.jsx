import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import ArrowShortIcon from 'ui/icons/ArrowShort';

export default function Pagination({ theme = 'default', page, pageCount, onClick }) {

	const { t } = useTranslation();
	
	if (theme === 'rounded') {
		return (
			<div className="pagination pagination-rounded">
				<div onClick={(_) => onClick(1)} className="pagination-item __first">
					<a href="#" className="pagination-link">{t('actions:first')}</a>
				</div>
				<div className="pagination-list">
					<div onClick={(_) => onClick(page > 1 ? page - 1 : 1)} className="pagination-item __prev">
						<a className="pagination-link pagination-link-arrow" href="#">
							<ArrowShortIcon/>
						</a>
					</div>
					<span className="color-grey font-secondary-bold">{t('labels:page-of', { current: page, total: pageCount })}</span>
					<div onClick={(_) => onClick(page + 1)} className="pagination-item __next">
						<a href="#" className="pagination-link pagination-link-arrow">
							<ArrowShortIcon/>
						</a>
					</div>
				</div>
				<div onClick={(_) => onClick(pageCount)} className="pagination-item __last">
					<a href="#"  className="pagination-link">{t('actions:last')}</a>
				</div>
			</div>
		)
	}

	return (
		<div className="pagination pagination-line">
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