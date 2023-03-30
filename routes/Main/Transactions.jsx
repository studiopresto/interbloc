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
import routes from "~config/routes";
import Link from "next/link";
import {formatDenomToString} from "~utils/formatting/coins";
import coinConfig from "../../coin.config";
import {isEmptyObject} from "~utils/object/detectEmptyObject";



export default function TransactionsMain() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectTransactions);


	useEffect(() => {
		dispatch(fetchTransactions({ limit: 6, per_page: 6, page: 1 }));
	}, [dispatch]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		return (
			<div className="table-box">
				<table className="table">
					<thead>
					<tr>
						<th>Hash</th>
						<th>Block</th>
						<th>Type</th>
						<th>Fee</th>
						{/*<th>Results</th>*/}
						<th>Time</th>
					</tr>
					</thead>
					<tbody>
					{
						data.transactions.map((option, index) => (
							<tr key={index}>
								<td data-title='Hash'>
									<Link href={`${routes.public.transactions}/${option.txhash}`}>
										<a>
											<span className="font-secondary-bold color-turquoise">{hashShortening(option.txhash)}</span>
										</a>
									</Link>
								</td>
								<td data-title='Block'>
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
								<td data-title='Type'><span className="font-book">{option.type}</span></td>
								<td data-title='Fee'><span className="font-book">{
									option.authInfo.fee.amount ?
										formatDenomToString(option.authInfo.fee.amount[0].amount , option.authInfo.fee.amount[0].denom) :
										formatDenomToString(0, coinConfig.denom)
								}</span></td>

								{/*<td><span className="font-book">0</span></td>*/}
								<td data-title='Time'><span className="font-book">{getDateDifferent(option.unixTimestamp * 1000, new Date())} ago</span></td>
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
