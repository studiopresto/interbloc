import {useSelector} from 'react-redux';
import dynamic from "next/dynamic";
import useTranslation from 'next-translate/useTranslation';
import {selectValidator} from 'store/slices/getValidatorSlice';
import Preloader from 'ui/components/Preloader';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {styles} from 'config/chart';
import {STATUS} from 'config/constants';

const Plot = dynamic(import('../../../node_modules/react-plotly.js/react-plotly'), {
	ssr: false
});

export default function PriceStatistics() {

	const { data, status } = useSelector(selectValidator);
	const { t } = useTranslation();

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>;
	}

	return (
		<div className="price-statistics-chart">
			<Plot
				data={[
					{
						x: data.historic.dates,
						y: data.historic.voting_power,
						type: 'scatter',
						mode: 'lines',
						name: t('labels:voting-power'),
						line: {
							width: 4,
							color: '#FFB342',
							shape: 'spline'
						},
					},
					{
						x: data.historic.dates,
						y: data.historic.rank,
						type: 'scatter',
						mode: 'lines',
						name: t('labels:rank'),
						yaxis: 'y2',
						line: {
							width: 4,
							color: '#42BAE2',
							shape: 'spline'
						},
					},
				]}
				layout={{
					width: null,
					height: null,
					autosize: true,
					showlegend: true,
					legend: {
						orientation: 'h',
						y: 1.2,
						x: 0.75,
					},
					margin: {t: 20, r: 0, b: 30, l: 35},
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
						// tickformat: '%d.%m',
					},
					yaxis: {
						// visible: false,
						gridcolor: '#292929',
						linecolor: '#292929',
						title: {
							text: t('labels:voting-power'),
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
					yaxis2: {
						// visible: false,
						side: 'right',
						overlaying: 'y',
						autorange: 'reversed',
						gridcolor: '#292929',
						linecolor: '#292929',
						title: {
							text: t('labels:rank'),
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
					hovermode: 'x unified',
				}}
				config={styles.config}
				style={styles.style}
			/>
		</div>
	)
}
