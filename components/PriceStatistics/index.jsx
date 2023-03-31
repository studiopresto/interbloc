import {useSelector} from 'react-redux';
import dynamic from "next/dynamic";

const Plot = dynamic(import('react-plotly.js'), {
	ssr: false
})/*
Store
 */
import {selectValidator} from '~store/slices/getValidatorSlice';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
/*
Utils
 */
import {isEmptyObject} from '~utils/object/detectEmptyObject';
/*
Configs
 */
import {styles} from '~config/chart';
import {STATUS} from '~config/constants';
import {da} from "plotly.js/src/traces/carpet/attributes";



export default function PriceStatistics() {

	const { data, status } = useSelector(selectValidator);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>;
	}

	console.log(data)

	return (
		<div className="price-statistics-chart">
			<Plot
				data={[
					{
						x: data.historic.dates,
						y: data.historic.voting_power,
						type: 'scatter',
						mode: 'lines',
						name: 'Voting Power',
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
						name: 'Rank',
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
						// tickformat: '%d.%m',
					},
					yaxis: {
						// visible: false,
						gridcolor: '#292929',
						linecolor: '#292929',
						title: {
							text: 'Voting Power',
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
							text: 'Rank',
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
