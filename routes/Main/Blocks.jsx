import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import NumberFormat from 'react-number-format';
/*
Store
 */
import {fetchBlocks, selectBlocks} from '~store/slices/getBlocksSlice';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
import ErrorBlock from '~ui/components/Error';
/*
Utils
 */
import {getDateDifferent} from '~utils/date/getDateDifferent';
/*
Config
 */
import {STATUS} from "~config/constants";



export default function BlocksMain() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectBlocks);

	useEffect(() => {
		dispatch(fetchBlocks({ items_per_page: 6, page: 1 }))
	}, [dispatch]);

	if (!data.length && status === STATUS.PENDING) {
		return <Preloader/>;
	}

	if (data.length && status === STATUS.FULFILLED) {
		return (
			<div className="table-box">
				<table className="table">
					<thead>
					<tr>
						<th>Height</th>
						<th>Proposer</th>
						{/*<th>Txs</th>*/}
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
								<td>
									<div className="d-inline-flex align-items-center">
										<div className="thumb size-30 position-left">
											<img src={`https://via.placeholder.com/60x60?text=${option.blockproposer}`} alt={option.blockproposer}/>
										</div>
										<span className="font-secondary-bold">{option.blockproposer}</span>
									</div>
								</td>
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