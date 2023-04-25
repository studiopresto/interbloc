import { styles } from 'config/chart';
import dynamic from "next/dynamic";

const Plot = dynamic(() => import('../../../node_modules/react-plotly.js/react-plotly'), { ssr: false });


export default function TransactionTypes({types}) {

	const values = [];
	const labels = [];

	Object.keys(types).forEach(type => {
		values.push(types[type]);
		labels.push(type);
	});

	return (
		<div className="transaction-types-chart">
			<Plot
				data={[
					{
						values,
						labels,
						type: 'pie',
						hole: .55,
						textinfo: 'none',
						hoverinfo: 'value',
					}
				]}
				layout={{
					width: null,
					height: null,
					autosize: true,
					showlegend: true,
					legend: {
						x: 1,
						y: 1,
					},
					margin: { t: 10, r: 0, b: 0, l: 0 },
					font: styles.font,
					paper_bgcolor: 'transparent',
					plot_bgcolor: 'transparent',
					xaxis: {
						visible: false,
					},
					yaxis: {
						visible: false,
					},
				}}
				config={styles.config}
				style={styles.style}
			/>
		</div>
	)
}
