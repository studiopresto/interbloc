import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
/*
Components
 */
import Pagination from '~components/Pagination';
/*
Store
 */
import {fetchTransactions} from '~store/slices/getTransactionsSlice';
/*
Icons
 */
import TransactionsIcon from '~ui/icons/Transactions';
import EyeIcon from '~ui/icons/Eye';
import ArrowIcon from '~ui/icons/Arrow';
import Button from '~ui/components/Button';



export default function TransactionsPage() {

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchTransactions());
	}, [dispatch]);

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
								<p className="font-16 font-book mb-1">More than > <span className="color-turquoise font-bold">1,546,529,943</span> transaction found</p>
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
								<th>Method</th>
								<th>Block</th>
								<th>Age</th>
								<th>From</th>
								<th/>
								<th>To</th>
								<th>Value</th>
								<th>Txn Fee</th>
								<th/>
							</tr>
						</thead>
						<tbody>
						{
							Array.from({ length: 14 }).map((_, index) => (
								<tr key={index}>
									<td>
										<Button icon color="transparent">
											<EyeIcon/>
										</Button>
									</td>
									<td>
										<span className="color-turquoise font-secondary-bold font-hash">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
									</td>
									<td>
										<span className="color-violet font-12 font-bold status">Deposit</span>
									</td>
									<td>
										<span className="font-book">{12122314 * ( index + 1 )}</span>
									</td>
									<td>
										<span className="font-book">1 hr 3min ago</span>
									</td>
									<td>
										<span className="font-book font-hash">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
									</td>
									<td>
										<Button>
											<ArrowIcon/>
										</Button>
									</td>
									<td>
										<span className="font-book font-hash">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
									</td>
									<td>
										<span className="font-book">{0.054 * ( index + 1 )} Ether</span>
									</td>
									<td>
										<span className="font-book">{0.00034556781244 * ( index + 1 )}</span>
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