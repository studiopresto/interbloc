import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
/*
Icons
 */
import TransactionsIcon from '~ui/icons/Transactions';
import {fetchTransactions} from "~store/slices/getTransactionsSlice";



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
					<p className="font-16 font-bold">Eth: <span className="color-violet">$3,093,59</span> (+3.81%)</p>
				</div>
			</div>
			<div className="page-body">

			</div>
		</>
	)
}