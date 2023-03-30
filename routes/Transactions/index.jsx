import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
/*
Components
 */
import Pagination from '~components/Pagination';
import Button from '~ui/components/Button';
import Preloader from '~ui/components/Preloader';
/*
Store
 */
import {fetchTransactions, selectTransactions} from '~store/slices/getTransactionsSlice';
/*
Icons
 */
import TransactionsIcon from '~ui/icons/Transactions';
import EyeIcon from '~ui/icons/Eye';
import ArrowIcon from '~ui/icons/Arrow';
/*
Config
 */
import {STATUS} from '~config/constants';
import routes from '~config/routes';
/*
Utils
 */
import {getDateDifferent} from '~utils/date/getDateDifferent';
import Card from "~ui/components/Card";
import Chip from "~ui/components/Chip";
import {formatDenomToString} from "~utils/formatting/coins";
import {formatMessageToReadableArray} from "~utils/formatting/transactions";
import ErrorBlock from "~ui/components/Error";
import coinConfig from "../../coin.config";
import {isEmptyObject} from "~utils/object/detectEmptyObject";
import {fetchChainStats, selectChainStats} from "~store/slices/getChainStats";



export default function TransactionsPage() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectTransactions);
	const { data: chainData, status: chainStatus } = useSelector(selectChainStats);

	const [page, setPage] = useState(1)
	let per_page = 10;

	const paginationChange = p => {
		setPage(p)
	}

	useEffect(() => {
		dispatch(fetchTransactions({ page: page, per_page: per_page }));
		dispatch(fetchChainStats());
	}, [dispatch, page]);

	if (isEmptyObject(data) && status === STATUS.REJECTED) {
		return <ErrorBlock/>
	}

	if (!isEmptyObject(data) && status === STATUS.PENDING || status === STATUS.IDLE) {
		return <Preloader/>;
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		console.log(data)
		return (
			<>
				<div className="page-header-inner">
					<div className="page-header-thumb __orange">
						<TransactionsIcon/>
					</div>
					<div>
						<h1 className="h-2">Transactions</h1>
						<p className="font-16 font-secondary-bold">{coinConfig.ticker}: <span className="color-violet">${chainStatus === STATUS.FULFILLED ? chainData.fiatPrice : "Loading"}</span></p>
					</div>
				</div>
				<div className="page-body">
					<div className="table-box">
						<div className="table-header">
							<div className="row">
								<div className="col-12 col-md-6 mb-3">
									<p className="font-16 font-book mb-1"><span
										className="color-turquoise font-bold">{ data.pagination.total }</span> transactions found</p>
									<p className="font-12 font-book color-grey">(Showing { per_page } records)</p>
								</div>
								<div className="col-12 col-md-6">
									<div className="d-flex justify-content-end left-text">
										<Pagination onClick={paginationChange} page={page} pageCount={data.pagination.totalPages} theme="rounded"/>
									</div>
								</div>
							</div>
						</div>
						<table className="table table-large">
							<thead>
							<tr>
								<th/>
								<th>Txs Hash</th>
								{/*<th>Method</th>*/}
								<th>Block</th>
								<th>Age</th>
								<th>Method(s)</th>
								{/*<th>Value</th>*/}
								<th>Txn Fee</th>
								<th/>
							</tr>
							</thead>
							<tbody>
							{
								data.transactions.map((option, index) => (
									<tr key={index}>
										<td>
											<Link href={`${routes.public.transactions}/${option.txhash}`}>
												<a>
													<Button icon color="transparent">
														<EyeIcon/>
													</Button>
												</a>
											</Link>
										</td>
										<td data-title='Txs Hash'>
											<Link href={`${routes.public.transactions}/${option.txhash}`}>
												<a className=" color-turquoise font-secondary-bold font-hash ">{option.txhash}</a>
											</Link>
										</td>
										{/*<td>*/}
										{/*	<span className="color-violet font-12 font-bold status">Deposit</span>*/}
										{/*</td>*/}
										<td data-title='block'>
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
										<td data-title='Age'>
											<span className="font-book">{getDateDifferent(option.unixTimestamp * 1000, new Date())} ago</span>
										</td>
										<td data-title="Method(s)">
											{option.tx.body.messages.map((msg, msgindex) => (
												<span key={msgindex} className="chip ml-2">{ formatMessageToReadableArray(msg)[1] }</span>
											))
											}
										</td>
										{/*
										<td>
											<Link href={`${routes.public.transactions}/${option.hash}`}>
												<a>
													<Button>
														<ArrowIcon/>
													</Button>
												</a>
											</Link>
										</td>
										*/}
										{/*<td>*/}
										{/*	<span className="font-book">-</span>*/}
										{/*</td>*/}
										<td data-title="Txn Fee">
											<span className="font-book">{
												option.authInfo.fee.amount ?
													formatDenomToString(option.authInfo.fee.amount[0].amount , option.authInfo.fee.amount[0].denom) :
													formatDenomToString(0, coinConfig.denom)
											}</span>
										</td>
										<td>
											<div className="signal bg-primary"/>
										</td>
									</tr>
								))
							}
							</tbody>
						</table>
					</div>
				</div>
			</>
		)
	}

	return null;
}
