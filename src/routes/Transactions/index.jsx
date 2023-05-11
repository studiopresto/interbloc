import {useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useDispatch, useSelector} from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import NumberFormat from 'react-number-format';
import Pagination from 'components/Pagination';
import Button from 'ui/components/Button';
import Preloader from 'ui/components/Preloader';
import {fetchTransactions, selectTransactions} from 'store/slices/getTransactionsSlice';
import TransactionsIcon from 'ui/icons/Transactions';
import EyeIcon from 'ui/icons/Eye';
import {QUERY_PARAMETERS, STATUS} from 'config/constants';
import routes from 'config/routes';
import {getDateDifferent} from 'utils/date/getDateDifferent';
import {formatDenomToString} from 'utils/formatting/coins';
import {formatMessageToReadableArray} from 'utils/formatting/transactions';
import ErrorBlock from 'ui/components/Error';
import EmptyBlock from 'ui/components/Empty/EmptyBlock';
import coinConfig from '../../../coin.config';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {fetchChainStats, selectChainStats} from 'store/slices/getChainStats';

export default function TransactionsPage() {
	
	const dispatch = useDispatch();
	const {query} = useRouter();
	const page = !!Number(query.page) ? Number(query.page) : 1;
	const {data, status} = useSelector(selectTransactions);
	const {data: chainData, status: chainStatus} = useSelector(selectChainStats);
	const {t} = useTranslation();
	
	useEffect(() => {
		dispatch(fetchTransactions({page}));
		dispatch(fetchChainStats());
	}, [dispatch, page]);
	
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __orange">
					<TransactionsIcon/>
				</div>
				<div>
					<h1 className="h-2">{t('transactions:page-title')}</h1>
					<p className="font-16 font-secondary-bold">{coinConfig.ticker}: <span
						className="color-violet">${chainStatus === STATUS.FULFILLED ? chainData.fiatPrice : t('labels:loading')}</span>
					</p>
				</div>
			</div>
			{status === STATUS.PENDING || status === STATUS.IDLE ? <Preloader/> : null}
			{isEmptyObject(data) || status === STATUS.REJECTED ? <ErrorBlock/> : null}
			{status === STATUS.FULFILLED && !data.transactions.length ? <EmptyBlock/> : null}
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
										{t('labels:transactions')} {t('labels:found')}
									</p>
									<p className="font-12 font-book color-grey">({t('labels:showing-records', {count: QUERY_PARAMETERS.PARE_PAGE})})</p>
								</div>
								<div className="col-12 col-md-6">
									<div className="d-flex justify-content-end left-text">
										<Pagination page={page} pageCount={data.pagination.totalPages} theme="rounded" url={routes.public.transactions}/>
									</div>
								</div>
							</div>
						</div>
						<table className="table table-large">
							<thead>
							<tr>
								<th/>
								<th>{t('labels:txs-hash')}</th>
								<th>{t('labels:block')}</th>
								<th>{t('labels:age')}</th>
								<th>{t('labels:method')}</th>
								<th>{t('labels:txn-fee')}</th>
								<th/>
							</tr>
							</thead>
							<tbody>
							{
								data.transactions.map((option, index) => (
									<tr key={index}>
										<td className="hidden-xxl">
											<Link href={`${routes.public.transactions}/${option.txhash}`}>
												<a>
													<Button icon color="transparent">
														<EyeIcon/>
													</Button>
												</a>
											</Link>
										</td>
										<td data-title={t('labels:txs-hash')}>
											<Link href={`${routes.public.transactions}/${option.txhash}`}>
												<a className=" color-turquoise font-secondary-bold font-hash ">{option.txhash}</a>
											</Link>
										</td>
										<td data-title={t('labels:block')}>
											<Link href={`${routes.public.blocks}/${option.height}`}>
												<a>
													<NumberFormat
														value={option.height}
														displayType="text"
														thousandSeparator={true}
														renderText={(value, props) => {
															return <span className="font-book" {...props}>{value}</span>;
														}}/>
												</a>
											</Link>
										</td>
										<td data-title={t('labels:age')}>
											<span className="font-book">{getDateDifferent(option.unixTimestamp * 1000, new Date())} ago</span>
										</td>
										<td data-title={t('labels:method')}>
											{option.tx.body.messages.map((msg, msgindex) => (
												<span key={msgindex} className="chip ml-2">{formatMessageToReadableArray(msg)[1]}</span>
											))
											}
										</td>
										<td data-title={t('labels:txn-fee')}>
											<span className="font-book">{
												option.authInfo.fee.amount ?
													formatDenomToString(option.authInfo.fee.amount[0].amount, option.authInfo.fee.amount[0].denom) :
													formatDenomToString(0, coinConfig.denom)
											}</span>
										</td>
										<td className="hidden-xxl">
											<div className="signal bg-primary"/>
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
