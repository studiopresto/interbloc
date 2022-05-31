import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
/*
Store
 */
import {fetchTransactions, selectTransactions} from '~store/slices/getTransactionsSlice';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
import ErrorBlock from '~ui/components/Error';
/*
Utils
 */
import hashShortening from '~utils/string/hashShortening';
import {getDateDifferent} from '~utils/date/getDateDifferent';
/*
Config
 */
import {STATUS} from '~config/constants';



export default function TransactionsMain() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectTransactions);


	useEffect(() => {
		dispatch(fetchTransactions({ items_per_page: 6, page: 1 }));
	}, [dispatch]);

	if (!data.length && status === STATUS.PENDING) {
		return <Preloader/>
	}

	if (data.length && status === STATUS.FULFILLED) {
		return (
			<div className="table-box">
				<table className="table">
					<thead>
					<tr>
						<th>Block</th>
						<th>Hash</th>
						<th>Type</th>
						<th>Fee</th>
						{/*<th>Results</th>*/}
						<th>Time</th>
					</tr>
					</thead>
					<tbody>
					{
						data.map((option, index) => (
							<tr key={index}>
								<td>
									<NumberFormat
										value={option.height}
										displayType="text"
										thousandSeparator={true}
										renderText={(value, props) => {
											return <span className="font-secondary-bold color-turquoise" {...props}>{value}</span>;
										}}/>
								</td>
								<td><span className="font-book">{hashShortening(option.hash)}</span></td>
								<td><span className="font-book">{option.type}</span></td>
								<td><span className="font-book">{option.fee.amount} {option.fee.denom}</span></td>
								{/*<td><span className="font-book">0</span></td>*/}
								<td><span className="font-book">{getDateDifferent(option.timestamp * 1000, new Date())} ago</span></td>
							</tr>
						))
					}
					</tbody>
				</table>
			</div>
		)
	}

	return <ErrorBlock/>;
}