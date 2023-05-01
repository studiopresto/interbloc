import {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import useTranslation from 'next-translate/useTranslation';
import NumberFormat from 'react-number-format';
import {fetchPrices, selectPrices} from 'store/slices/getPricesSlice';
import ErrorBlock from 'ui/components/Error';
import Preloader from 'ui/components/Preloader';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {STATUS} from 'config/constants';
import { styles } from 'config/chart';
import coinConfig from "../../../coin.config";
const Plot = dynamic(import('../../../node_modules/react-plotly.js/react-plotly'), {
	ssr: false, loading: () => <Preloader/>
});

export default function Prices() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectPrices);
	const [price, setPrice] = useState(0);
	const [marketCap, setMarketCap] = useState(0);
	const [totalVolumes, setTotalVolumes] = useState(0);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(fetchPrices());
	}, [dispatch]);

	useEffect(() => {
		if (!!data?.price) {
			setPrice(data.price[data.price.length - 1]);
		}
	}, [data]);

	useEffect(() => {
		if (!!price && !isEmptyObject(data)) {
			let index = data.price.indexOf(price);
			!!data.total_volumes[index] ? setTotalVolumes(data.total_volumes[index].toFixed()) : null;
			!!data.market_caps[index] ? setMarketCap(data.market_caps[index].toFixed()) : null;
		}
	}, [price, data]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		return (
			<>
				<div className="row">
					<div className="col-12 col-sm-6 mb-3 mb-sm-0">
						<div className="h-100 d-flex flex-column justify-content-end">
							<p className="color-grey font-16">{t('labels:price')}</p>
							<p className="h-2 color-primary">${price}</p>
						</div>
					</div>
					<div className="col-12 col-sm-6">
						<ul className="table-list">
							<li>
								<span className="color-grey font-bold">{t('labels:market-cap')}:</span>
								<NumberFormat
									value={marketCap}
									displayType="text"
									thousandSeparator={true}
									renderText={(value, props) => {
										return <span className="font-16 font-secondary-bold" {...props}>{value}</span>
									}}/>
							</li>
							<li>
								<span className="color-grey font-bold">{t('labels:total-voting-power')}:</span>
								<span className="font-16 font-secondary-bold">
									<NumberFormat
										value={totalVolumes}
										displayType="text"
										thousandSeparator={true}
										renderText={(value, props) => {
											return <span {...props}>{value}</span>
										}}/>
									<span className="color-grey text-uppercase font-12"> {coinConfig.ticker}</span>
								</span>
							</li>
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
									shape: 'spline'
								},
							},
						]}
						layout={{
							width: null,
							height: null,
							autosize: true,
							showlegend: false,
							margin: {t: 5, r: 0, b: 30, l: 35},
							font: styles.font,
							paper_bgcolor: 'transparent',
							plot_bgcolor: 'transparent',
							xaxis: {
								// visible: false,
								gridcolor: '#292929',
								linecolor: '#292929',
								title: {
									text: t('labels:date'),
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
									text: t('labels:price'),
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
						config={styles.config}
						style={styles.style}
						onHover={({ points }) => setPrice(points[0].y)}
					/>
				</div>
			</>
		)
	}

	return <ErrorBlock/>;
}
