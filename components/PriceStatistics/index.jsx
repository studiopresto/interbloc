import {useSelector} from 'react-redux';
import Plot from 'react-plotly.js';
/*
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



export default function PriceStatistics() {

	const { data, status } = useSelector(selectValidator);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>;
	}

	return (
		<div className="price-statistics-chart">
			<Plot
				data={[
					{
						x: data.historic.dates,
						y: data.historic.rank,
						type: 'scatter',
						mode: 'lines',
						name: 'Rank',
						line: {
							width: 4,
							color: '#42BAE2',
							shape: 'spline'
						},
					},
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
					hovermode: 'x unified',
				}}
				config={styles.config}
				style={styles.style}
			/>
		</div>
	)
}