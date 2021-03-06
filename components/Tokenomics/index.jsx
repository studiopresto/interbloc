import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import Plot from 'react-plotly.js';
/*
Store
 */
import {fetchTokenomics, selectTokenomics} from '~store/slices/getTokenomicsSlice';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
import ErrorBlock from '~ui/components/Error';
/*
Utils
 */
import {isEmptyObject} from '~utils/object/detectEmptyObject';
/*
Config
 */
import {STATUS} from '~config/constants';
import { styles } from '~config/chart';



export default function Tokenomics() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectTokenomics);

	useEffect(() => {
		dispatch(fetchTokenomics());
	}, [dispatch]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {

		const { supply, bonded, unbonding } = data;
		let boundedPercent = parseFloat(( ( bonded * 100 ) / supply ).toFixed(2));
		let unBoundedPercent = parseFloat(( ( unbonding * 100 ) / supply ).toFixed(2));
		let boundedPercentFake = ( boundedPercent / 100 ) * 50;
		let unBoundedPercentFake = ( unBoundedPercent / 100 ) * 50;
		const values = [boundedPercentFake, unBoundedPercentFake, 50];

		return (
			<>
				<div className="row">
					<div className="col-6">
						<p className="color-grey font-bold">Bonded:</p>
						<NumberFormat
							value={bonded}
							displayType="text"
							thousandSeparator={true}
							renderText={(value, props) => {
								return <p className="font-16 font-secondary-bold color-orange" {...props}>{value}</p>
							}}/>
						<p className="color-grey font-secondary-bold font-12">BTSG</p>
						<p className="mt-2">{boundedPercent.toFixed(2)} %</p>
					</div>
					<div className="col-6">
						<p className="color-grey font-bold">Unbonded:</p>
						<NumberFormat
							value={unbonding}
							displayType="text"
							thousandSeparator={true}
							renderText={(value, props) => {
								return <p className="font-16 font-secondary-bold color-violet" {...props}>{value}</p>
							}}/>
						<p className="color-grey font-secondary-bold font-12">BTSG</p>
						<p className="mt-2">{unBoundedPercent.toFixed(2)} %</p>
					</div>
				</div>
				<div className="row">
					<div className="col-8">
						<div className="tokenomics-chart">
							<Plot
								data={[
									{
										values,
										labels: ['', '', ''],
										type: 'pie',
										rotation: 90,
										marker: {
											colors: ['#D69F4D', '#9485FE', '#1E1F1F'],
										},
										textinfo: 'none',
									}
								]}
								layout={{
									width: null,
									height: null,
									autosize: true,
									showlegend: false,
									margin: {t: 0, r: 0, b: 0, l: 0},
									font: styles.font,
									paper_bgcolor: 'transparent',
									plot_bgcolor: 'transparent',
									xaxis: {
										visible: false,
									},
									yaxis: {
										visible: false,
									},
									hovermode: false,
								}}
								config={styles.config}
								style={styles.style}
							/>
						</div>
					</div>
					<div className="col-4">
						<div className="tokenomics-legends d-flex flex-column">
							<p className="font-12 color-grey legend mb-2">
								<span className="legend-icon bg-orange"/>
								<span className="legend-title">Bonded</span>
							</p>
							<p className="font-12 color-grey legend">
								<span className="legend-icon bg-violet"/>
								<span className="legend-title">Unbonding</span>
							</p>
						</div>
					</div>
				</div>
				<div className="row align-items-center">
					<div className="col-8">
						<p className="color-grey font-bold">Staking:</p>
					</div>
					<div className="col-4">
						<NumberFormat
							value={supply}
							displayType="text"
							thousandSeparator={true}
							renderText={(value, props) => {
								return <p className="font-16 font-secondary-bold" {...props}>{value}</p>
							}}/>
					</div>
				</div>
			</>
		)
	}

	return <ErrorBlock/>
}