import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from "next/dynamic";

const Plot = dynamic(import('react-plotly.js'), {
	ssr: false
})/*
Store
 */
import {fetchMempool, selectMempool} from '~store/slices/getMempoolSlice';
/*
Utils
 */
import {isEmptyObject} from '~utils/object/detectEmptyObject';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
import ErrorBlock from '~ui/components/Error';
/*
Config
 */
import {STATUS} from '~config/constants';
import { styles } from '~config/chart';



export default function Mempool() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectMempool);

	useEffect(() => {
		dispatch(fetchMempool());
	}, [dispatch]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {

		return (
			<>
				<p className="font-16 color-grey font-bold">Transactions pending:</p>
				<p className="h-2">{data.pending}</p>
				<div className="mempool-chart">
					<Plot
						data={[
							{
								//x: data?.feesNumeric,
								x: ["0", "<250", "251 - 1000", "1001 - 4000", "4001 - 10000", ">10000"],
								y: data?.feesValues,
								type: 'bar',
								marker: {
									color: '#687EFF',
								},
								cornerroundness: {
									bottomleft: 10,
								}
							}
						]}
						layout={{
							width: null,
							height: null,
							autosize: true,
							showlegend: false,
							margin: {t: 10, r: 0, b: 30, l: 30},
							font: styles.font,
							paper_bgcolor: 'transparent',
							plot_bgcolor: 'transparent',
							xaxis: {
								// visible: false,
								gridcolor: '#292929',
								linecolor: '#292929',
								title: {
									text: 'Fee',
									font: {
										color: '#A3A3A3',
										size: 10,
									},
									standoff: 0,
								},
								tickfont: {
									color: '#5C5C5C',
									size: 10,
								},
							},
							yaxis: {
								// visible: false,
								gridcolor: '#292929',
								linecolor: '#292929',
								title: {
									text: 'Count',
									font: {
										color: '#A3A3A3',
										size: 10,
									},
									standoff: 0,
								},
								tickfont: {
									color: '#5C5C5C',
									size: 10,
								},
							},
							hovermode: false,
							bargap: 0.4,
						}}
						config={styles.config}
						style={styles.style}
					/>
				</div>
			</>
		)
	}

	return <ErrorBlock/>;
}
