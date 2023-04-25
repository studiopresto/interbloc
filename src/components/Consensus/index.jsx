import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import useTranslation from 'next-translate/useTranslation';
import {fetchConsensus, selectConsensus} from 'store/slices/getConsensusSlice';
import Preloader from 'ui/components/Preloader';
import ErrorBlock from 'ui/components/Error';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {STATUS} from 'config/constants';
import { styles } from 'config/chart';
const Plot = dynamic(import('../../../node_modules/react-plotly.js/react-plotly'), {
	ssr: false
})

export default function Consensus() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectConsensus);
	const { t } = useTranslation();

	useEffect(() => {
		dispatch(fetchConsensus());
	}, [dispatch]);

	if(isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {

		const { voting_power: { total, online }, validators } = data;
		const onlinePercent = (( online / total ) * 100).toFixed();

		return (
			<>
				<div className="row">
					<div className="col-6">
						<p className="color-grey font-bold mt-1">{t('labels:voting-power-online')}:</p>
						<p className="font-secondary-bold color-orange font-16 mt-1">{onlinePercent}%</p>
					</div>
					<div className="col-6">
						<p className="color-grey font-bold mt-1">{t('labels:number-of-validators')}:</p>
						<p
							className="font-secondary-bold color-violet font-16 mt-1">{`${validators?.active}/${validators?.total}`}</p>
					</div>
				</div>
				<div className="consensus-chart" data-label={t('labels:validators')}>
					<Plot
						data={[
							{
								values: [onlinePercent, (100 - onlinePercent)],
								labels: ['', '', ''],
								type: 'pie',
								hole: .9,
								marker: {
									colors: ['#D69F4D', '#323232'],
								},
								textinfo: 'none',
							}
						]}
						layout={{
							width: null,
							height: null,
							autosize: true,
							showlegend: false,
							margin: {t: 30, r: 0, b: 0, l: 0},
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
							annotations: [
								{
									font: {
										size: 16,
										family: 'SpaceMono-Bold',
										color: '#F9F9F9',
									},
									showarrow: false,
									text: `top ${validators?.voting_power?.top3}`,
									y: .55
								}
							],
						}}
						config={styles.config}
						style={styles.style}
					/>
				</div>
			</>
		)
	}

	return <ErrorBlock/>
}
