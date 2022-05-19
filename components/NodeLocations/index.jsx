import Plot from 'react-plotly.js';
import { data } from './data';



export default function NodeLocations() {

	const { location } = data;
	const values = [];
	const labels = [];

	Object.keys(location).forEach(loc => {
		values.push(location[loc]);
		labels.push(loc);
	});

	return (
		<>
			<div>
				<p className="color-grey">Active Nodes:</p>
				<p className="font-16 font-secondary-bold">500</p>
			</div>
			<div className="node-locations-chart">
				<Plot
					data={[
						{
							values,
							labels,
							type: 'pie',
							hole: .15,
							marker: {
								colors: ['#687EFF', '#1A70FE', '#4FF0D7', '#323232', '#D69F4D'],
								line: {
									color: '#FFFFFF',
									width: [1, 1, 1, 1, 1, 1],
								}
							},
							textinfo: 'label',
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
						font: {
							family: 'Nexa-Book',
							color: '#8B909A',
							size: 12,
							fontWeight: 400,
						},
						paper_bgcolor: 'transparent',
						plot_bgcolor: 'transparent',
						xaxis: {
							visible: false,
						},
						yaxis: {
							visible: false,
						},
					}}
					config={{
						displayModeBar: false,
					}}
					style={{
						width: '100%',
						height: '100%',
					}}
				/>
			</div>
		</>
	)
}