import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Link from 'next/link';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import NumberFormat from 'react-number-format';
import placeholder from '../../../public/static/images/placeholder.svg';
import {fetchBlocks, selectBlocks} from 'store/slices/getBlocksSlice';
import {
	fetchValidatorsAddressConversion,
	selectValidatorsAddressConversion
} from 'store/slices/getValidatorsAddressConversion';
import Preloader from 'ui/components/Preloader';
import ErrorBlock from 'ui/components/Error';
import BlocksIcon from 'ui/icons/Blocks';
import EmptyBlock from 'ui/components/Empty/EmptyBlock';
import hashShortening from 'utils/string/hashShortening';
import {getDateDifferent} from 'utils/date/getDateDifferent';
import routes from 'config/routes';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import Pagination from 'components/Pagination';
import {QUERY_PARAMETERS, STATUS} from 'config/constants';

export default function BlocksPage() {
	
	const dispatch = useDispatch();
	const {query: {page = 1}} = useRouter();
	const {data, status} = useSelector(selectBlocks);
	const {data: validatorData, status: validatorStatus} = useSelector(selectValidatorsAddressConversion);
	const {t} = useTranslation();
	let height = 0;
	
	useEffect(() => {
		dispatch(fetchBlocks({page: page}));
		dispatch(fetchValidatorsAddressConversion({height}));
	}, [dispatch, page]);
	
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __turquoise">
					<BlocksIcon/>
				</div>
				<div>
					<h1 className="h-2">{t('blocks:page-title')}</h1>
					<p className="h-6">{t('blocks:page-subtitle')}</p>
				</div>
			</div>
			{status === STATUS.PENDING || status === STATUS.IDLE ? <Preloader/> : null}
			{isEmptyObject(data) || status === STATUS.REJECTED ? <ErrorBlock/> : null}
			{status === STATUS.FULFILLED && !data.blocks.length ? <EmptyBlock/> : null}
			{!isEmptyObject(data) && status === STATUS.FULFILLED ? (
				<div className="page-body">
					<div className="table-box">
						<div className="table-header">
							<div className="row">
								<div className="col-12 col-md-6 mb-3">
									<p className="font-16 font-book mb-1">
										<NumberFormat
											value={data.pagination.total}
											displayType="text"
											thousandSeparator={true}
											renderText={(value, props) => {
												return <span className="color-turquoise font-bold" {...props}>{value} </span>
											}}/>
										{t('labels:blocks')} {t('labels:found')}
									</p>
									<p
										className="font-12 font-book color-grey">({t('labels:showing-records', {count: QUERY_PARAMETERS.PARE_PAGE})})</p>
								</div>
								<div className="col-12 col-md-6">
									<div className="d-flex justify-content-end left-text">
										<Pagination page={page} pageCount={data.pagination.totalPages} theme="rounded" url={routes.public.blocks}/>
									</div>
								</div>
							</div>
						</div>
						<table className="table">
							<thead>
							<tr>
								<th>{t('labels:height')}</th>
								<th>{t('labels:proposer')}</th>
								<th>{t('labels:hash')}</th>
								<th>{t('labels:time')}</th>
							</tr>
							</thead>
							<tbody>
							{
								data.blocks.map((option, index) => (
									<tr key={index}>
										<td data-title={t('labels:height')}>
											<Link href={`${routes.public.blocks}/${option.header.height}`}>
												<a>
													<NumberFormat
														value={option.header.height}
														displayType="text"
														thousandSeparator={true}
														renderText={(value, props) => {
															return <span className="font-secondary-bold color-turquoise" {...props}>{value}</span>;
														}}/>
												</a>
											</Link>
										</td>
										<td data-title={t('labels:proposer')}>
											<div className="d-inline-flex align-items-center">
												<div className="thumb size-30 position-left">
													{validatorData[option.header.proposerAddress.toUpperCase()] && validatorData[option.header.proposerAddress.toUpperCase()].description.identity && validatorData[option.header.proposerAddress.toUpperCase()].description.identity !== ''
														? <Image
															src={process.env.API_SERVER + 'validator/keybase/image/' + validatorData[option.header.proposerAddress.toUpperCase()].description.identity}
															width={30}
															height={30}
															alt={validatorData[option.header.proposerAddress.toUpperCase()].description.moniker + ' logo'}
															loading="lazy"
															blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/Pr9fwAJNAO+ieK6PgAAAABJRU5ErkJggg=="
														/>
														: <Image
															src={placeholder}
															width={30}
															height={30}
															alt={option.blockproposer}
															loading="lazy"
															blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/Pr9fwAJNAO+ieK6PgAAAABJRU5ErkJggg=="
														/>}
												</div>
												<span className="font-secondary-bold">
													{validatorStatus !== STATUS.FULFILLED || !(option.header.proposerAddress.toUpperCase() in validatorData)
														? option.header.proposerAddress.toUpperCase()
														: validatorData[option.header.proposerAddress.toUpperCase()].description.moniker}
												</span>
											</div>
										</td>
										<td data-title={t('labels:hash')}>
											<p className="font-book">{hashShortening(option.hash)}</p>
										</td>
										<td data-title={t('labels:time')}>
											<span className="font-book">{getDateDifferent(option.header.time * 1000, new Date())} ago</span>
										</td>
									</tr>
								))
							}
							</tbody>
						</table>
					</div>
				</div>
			) : null}
		</>
	)
}
