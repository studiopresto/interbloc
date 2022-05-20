import {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Plot from 'react-plotly.js';
import NumberFormat from 'react-number-format';
/*
Store
 */
import {fetchPrices, selectPrices} from '~store/slices/getPricesSlice';
/*
Components
 */
import ErrorBlock from '~ui/components/Error';



export default function Prices() {

	const dispatch = useDispatch();
	const { data } = useSelector(selectPrices);
	const [price, setPrice] = useState(0);
	const [marketCap, setMarketCap] = useState(0);
	const [totalVolumes, setTotalVolumes] = useState(0);

	useEffect(() => {
		dispatch(fetchPrices());
	}, [dispatch]);

	useEffect(() => {
		if (!!data?.price) {
			setPrice(data.price[0]);
		}
	}, [data]);

	useEffect(() => {
		if (!!price) {
			let index = data.price.indexOf(price);
			!!data.total_volumes[index] ? setTotalVolumes(data.total_volumes[index].toFixed()) : null;
			!!data.market_caps[index] ? setMarketCap(data.market_caps[index].toFixed()) : null;
		}
	}, [price, data.market_caps, data.price, data.total_volumes]);

	if (!!data?.price && !!data?.date) {
		return (
			<>
				<div className="row">
					<div className="col-6">
						<div className="h-100 d-flex flex-column justify-content-end">
							<p className="color-grey font-16">Price</p>
							<p className="h-2 color-primary">${price}</p>
						</div>
					</div>
					<div className="col-6">
						<ul className="table-list">
							<li>
								<span className="color-grey font-bold">Market Cap:</span>
								<NumberFormat
									value={marketCap}
									displayType="text"
									thousandSeparator={true}
									renderText={(value, props) => {
										return <span className="font-16 font-secondary-bold" {...props}>{value}</span>
									}}/>
							</li>
							<li>
								<span className="color-grey font-bold">Total Voting Power:</span>
								<span className="font-16 font-secondary-bold">
									<NumberFormat
										value={totalVolumes}
										displayType="text"
										thousandSeparator={true}
										renderText={(value, props) => {
											return <span {...props}>{value}</span>
										}}/>
									<span className="color-grey text-uppercase font-12"> token</span>
								</span>
							</li>
							{/*<li>*/}
							{/*	<span className="color-grey font-bold">Etc:</span>*/}
							{/*	<span className="font-16 font-secondary-bold">500</span>*/}
							{/*</li>*/}
						</ul>
					</div>
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
								line: {
									width: 5,
									color: '#42BAE2',
								},
							},
						]}
						layout={{
							width: null,
							height: null,
							autosize: true,
							showlegend: false,
							margin: {t: 5, r: 0, b: 30, l: 35},
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
							// hovermode: 'x unified',
						}}
						config={{
							displayModeBar: false,
						}}
						style={{
							width: '100%',
							height: '100%',
						}}
						onHover={({ points }) => setPrice(points[0].y)}
					/>
				</div>
			</>
		)
	} else {
		return <ErrorBlock/>;
	}
}