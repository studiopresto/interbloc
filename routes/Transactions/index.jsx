import { useEffect } from 'react';
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



export default function TransactionsPage() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectTransactions);

	useEffect(() => {
		dispatch(fetchTransactions({ items_per_page: 6, page: 1 }));
	}, [dispatch]);

	if (!data.length && status === STATUS.PENDING || status === STATUS.IDLE) {
		return <Preloader/>;
	}

	if (!!data.length && status === STATUS.FULFILLED) {
		return (
			<>
				<div className="page-header-inner">
					<div className="page-header-thumb __orange">
						<TransactionsIcon/>
					</div>
					<div>
						<h1 className="h-2">Transactions</h1>
						<p className="font-16 font-secondary-bold">Eth: <span className="color-violet">$3,093,59</span> (+3.81%)</p>
					</div>
				</div>
				<div className="page-body">
					<div className="table-box">
						<div className="table-header">
							<div className="row">
								<div className="col-6">
									<p className="font-16 font-book mb-1">More than > <span
										className="color-turquoise font-bold">1,546,529,943</span> transaction found</p>
									<p className="font-12 font-book color-grey">(Showing the last 500k records)</p>
								</div>
								<div className="col-6">
									<div className="d-flex justify-content-end">
										<Pagination theme="rounded"/>
									</div>
								</div>
							</div>
						</div>
						<table className="table">
							<thead>
							<tr>
								<th/>
								<th>Txs Hash</th>
								{/*<th>Method</th>*/}
								<th>Block</th>
								<th>Age</th>
								<th>From</th>
								<th/>
								<th>To</th>
								{/*<th>Value</th>*/}
								<th>Txn Fee</th>
								<th/>
							</tr>
							</thead>
							<tbody>
							{
								data.map((option, index) => (
									<tr key={index}>
										<td>
											<Button icon color="transparent">
												<EyeIcon/>
											</Button>
										</td>
										<td>
											<Link href={`${routes.public.transactions}/${option.hash}`}>
												<a className="color-turquoise font-secondary-bold font-hash">{option.hash}</a>
											</Link>
										</td>
										{/*<td>*/}
										{/*	<span className="color-violet font-12 font-bold status">Deposit</span>*/}
										{/*</td>*/}
										<td>
											<NumberFormat
												value={option.height}
												displayType="text"
												thousandSeparator={true}
												renderText={(value, props) => {
													return <span className="font-book" {...props}>{value}</span>;
												}}/>
										</td>
										<td>
											<span className="font-book">{getDateDifferent(option.timestamp * 1000, new Date())} ago</span>
										</td>
										<td>
											<span className="font-book font-hash">{option.from}</span>
										</td>
										<td>
											<Link href={`${routes.public.transactions}/${option.hash}`}>
												<a>
													<Button>
														<ArrowIcon/>
													</Button>
												</a>
											</Link>
										</td>
										<td>
											<span className="font-book font-hash">{option.to}</span>
										</td>
										{/*<td>*/}
										{/*	<span className="font-book">-</span>*/}
										{/*</td>*/}
										<td>
											<span className="font-book">{option.fee.amount} {option.fee.denom}</span>
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