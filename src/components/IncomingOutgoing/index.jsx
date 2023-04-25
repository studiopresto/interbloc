import dynamic from "next/dynamic";

const Plot = dynamic(import('../../../node_modules/react-plotly.js/react-plotly'), {
	ssr: false
})/*
Config
 */
import {styles} from 'config/chart';



export default function IncomingOutgoing() {
	return (
		<div className="incoming-outgoing-chart">
			<Plot
				data={[
					{
						x: [1, 2, 3, 4, 5, 6, 7],
						y: [6, 7, 7, 7, 6, 7, 7],
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
						x: [1, 2, 3, 4, 5, 6, 7],
						y: [10, 13, 9, 13, 10, 14, 10],
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
					hovermode: 'x unified',
				}}
				config={styles.config}
				style={styles.style}
			/>
		</div>
	)
}
