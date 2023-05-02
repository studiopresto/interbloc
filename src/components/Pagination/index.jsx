import PropTypes from 'prop-types';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import ArrowShortIcon from 'ui/icons/ArrowShort';

export default function Pagination({ theme = 'default', page = 1, pageCount, url = '/' }) {

	const { t } = useTranslation();
	
	if (theme === 'rounded') {
		return (
			<div className="pagination pagination-rounded">
				<div className="pagination-item __first">
					<Link href={`${url}/?page=${1}`}>
						<a className="pagination-link">{t('actions:first')}</a>
					</Link>
				</div>
				<div className="pagination-list">
					<div className="pagination-item __prev">
						<Link href={`${url}/?page=${Math.max(1, ( Number(page) - 1 ))}`}>
							<a className={`pagination-link pagination-link-arrow ${Number(page) === 1 ? 'disabled' : ''}`}>
								<ArrowShortIcon/>
							</a>
						</Link>
					</div>
					<span className="color-grey font-secondary-bold pl-2 pr-2">
						{t('labels:page-of', { current: page, total: pageCount })}
					</span>
					<div className="pagination-item __next">
						<Link href={`${url}/?page=${Math.min(pageCount, ( Number(page) + 1 ))}`}>
							<a className={`pagination-link pagination-link-arrow ${Number(page) === pageCount ? 'disabled' : ''}`}>
								<ArrowShortIcon/>
							</a>
						</Link>
					</div>
				</div>
				<div className="pagination-item __last">
					<Link href={`${url}/?page=${pageCount}`}>
						<a className="pagination-link">{t('actions:last')}</a>
					</Link>
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
				{/*{items}*/}
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