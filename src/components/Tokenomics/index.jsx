import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import useTranslation from 'next-translate/useTranslation';
import dynamic from "next/dynamic";
import {fetchTokenomics, selectTokenomics} from 'store/slices/getTokenomicsSlice';
import Preloader from 'ui/components/Preloader';
import ErrorBlock from 'ui/components/Error';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import { STATUS } from 'config/constants';
import { styles } from 'config/chart';
import { formatCoinsFromBaseDenom } from "utils/formatting/coins";
import coinConfig from "../../../coin.config";
const Plot = dynamic(import('../../../node_modules/react-plotly.js/react-plotly'), {
	ssr: false, loading: () => <Preloader/>
});

export default function Tokenomics() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectTokenomics);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(fetchTokenomics());
	}, [dispatch]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		const { supply, bonded, unbonding } = data;
		const unbonded = supply-bonded
		let bondedPercent = parseFloat(( ( bonded * 100 ) / supply ).toFixed(2));

		let unBondingPercent = parseFloat(( ( unbonding * 100 ) / supply ).toFixed(2));
		let unBondedPercent = parseFloat(( (unbonded * 100) / supply ).toFixed(2))
		let bondedPercentFake = ( bondedPercent / 100 ) * 50;
		let unBondedPercentFake = ( unBondedPercent / 100 ) * 50;
		let unBondingPercentFake = ( unBondingPercent / 100 ) * 50;
		const values = [bondedPercentFake, unBondedPercentFake, unBondingPercentFake, 50];
		return (
			<>
				<div className="row">
					<div className="col-6">
						<p className="color-grey font-bold">{t('labels:bonded')}:</p>
						<NumberFormat
							value={formatCoinsFromBaseDenom(bonded).value}
							displayType="text"
							suffix={formatCoinsFromBaseDenom(bonded).suffix}
							thousandSeparator={true}
							renderText={(value, props) => {
								return <p className="font-16 font-secondary-bold color-orange" {...props}>{value}</p>
							}}/>
						<p className="color-grey font-secondary-bold font-12">{coinConfig.ticker}</p>
						<p className="mt-2">{bondedPercent.toFixed(2)} %</p>
					</div>
					<div className="col-6">
						<p className="color-grey font-bold">{t('labels:unbonded')}:</p>
						<NumberFormat
							value={formatCoinsFromBaseDenom(unbonded).value}
							displayType="text"
							suffix={formatCoinsFromBaseDenom(unbonded).suffix}
							thousandSeparator={true}
							renderText={(value, props) => {
								return <p className="font-16 font-secondary-bold color-violet" {...props}>{value}</p>
							}}/>
						<p className="color-grey font-secondary-bold font-12">{coinConfig.ticker}</p>
						<p className="mt-2">{unBondedPercent.toFixed(2)} %</p>
					</div>
				</div>
				<div className="row">
					<div className="col-8">
						<div className="tokenomics-chart">
							<Plot
								data={[
									{
										values,
										labels: ['', '', '', ''],
										type: 'pie',
										rotation: 90,
										marker: {
											colors: ['#D69F4D', '#9485FE', '#4FF0D7', '#1E1F1F'],
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
								<span className="legend-title">{t('labels:bonded')}</span>
							</p>
							<p className="font-12 color-grey legend mb-2">
								<span className="legend-icon bg-violet"/>
								<span className="legend-title">{t('labels:unbonded')}</span>
							</p>
							{/*<p className="font-12 color-grey legend">*/}
							{/*	<span className="legend-icon bg-turquoise"/>*/}
							{/*	<span className="legend-title">Unbonding</span>*/}
							{/*</p>*/}
						</div>
					</div>
				</div>
				<div className="row align-items-center">
					<div className="col-8">
						<p className="color-grey font-bold">{t('labels:supply')}:</p>
					</div>
					<div className="col-4">
						<NumberFormat
							value={formatCoinsFromBaseDenom(supply).value}
							displayType="text"
							thousandSeparator={true}
							suffix={formatCoinsFromBaseDenom(supply).suffix}
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
