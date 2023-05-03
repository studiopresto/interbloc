import PropTypes from 'prop-types';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import useTranslation from 'next-translate/useTranslation';
import ArrowShortIcon from 'ui/icons/ArrowShort';
import {useRouter} from 'next/router';

export default function Pagination({ theme = 'default', page = 1, pageCount, url = '/' }) {

	const { t } = useTranslation();
	const router = useRouter();
	
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
		<ReactPaginate
			pageCount={pageCount}
			pageRangeDisplayed={2}
			marginPagesDisplayed={2}
			initialPage={Math.max(0, (Number(page) - 1))}
			containerClassName="pagination pagination-line"
			pageClassName="pagination-item"
			pageLinkClassName="pagination-link"
			activeClassName="is-active"
			nextClassName="pagination-item __next"
			previousClassName="pagination-item __prev"
			nextLinkClassName="pagination-link pagination-link-arrow"
			previousLinkClassName="pagination-link pagination-link-arrow"
			breakClassName="pagination-item"
			breakLinkClassName="pagination-link"
			previousLabel=""
			nextLabel=""
			onPageChange={({ selected }) => router.push(`${url}/?page=${selected + 1}`)}
		/>
	)
}

Pagination.propTypes = {
	theme: PropTypes.oneOf(['default', 'rounded']),
};