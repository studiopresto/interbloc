import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Plot from 'react-plotly.js';
/*
Store
 */
import {fetchPrices, selectPrices} from '~store/slices/getPricesSlice';
/*
Components
 */
import Preloader from '~ui/components/Preloader';



export default function Prices() {

	const dispatch = useDispatch();
	const { data } = useSelector(selectPrices);

	useEffect(() => {
		dispatch(fetchPrices());
	}, [dispatch]);

	if (!!data?.price && !!data?.date) {
		return (
			<>
				<div>

				</div>
				<div className="prices-chart">
					<Plot
						data={[
							{
								x: data.date,
								y: data.price,
								type: 'scatter',
								mode: 'lines',
								marker: {
									color: '#42BAE2',
								},
							}
						]}
						layout={{
							width: null,
							height: null,
							autosize: true,
							showlegend: false,
							margin: {t: 10, r: 0, b: 30, l: 35},
							font: {
								family: 'Nexa-Book',
								color: '#8B909A',
								size: 12,
								fontWeight: 400,
							},
							paper_bgcolor: 'transparent',
							plot_bgcolor: 'transparent',
							xaxis: {
								// visible: false,
								gridcolor: '#292929',
								linecolor: '#292929',
								title: {
									text: 'Date',
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
								tickformat: '%d.%m',
							},
							yaxis: {
								// visible: false,
								gridcolor: '#292929',
								linecolor: '#292929',
								title: {
									text: 'Price',
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
							// hovermode: false,
						}}
						config={{
							displayModeBar: false,
						}}
						style={{
							width: '100%',
							height: '100%',
						}}
					/>
				</div>
			</>
		)
	} else {
		return <Preloader/>;
	}
}