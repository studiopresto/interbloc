import Plot from 'react-plotly.js';
// import Chart from 'react-apexcharts';



export default function TokenomicsChart() {

	// const options = {
	// 	options: {
	// 		chart: {
	// 			width: 380,
	// 			type: 'pie',
	// 		},
	// 		labels: ['Team A', 'Team B', 'Team C'],
	// 	},
	// 	series: [20, 30, 50],
	// }

	// return (
	// 	<Chart options={options.options} series={options.series} type="pie" height={150}/>
	// )

	return (
		<Plot
			data={[
				{
					values: [20, 30, 50],
					type: 'pie',
					rotation: 90,
				}
			]}
			layout={{
				width: 300,
				height: 300,
				showlegend: false,
				paper_bgcolor: 'transparent',
				plot_bgcolor: 'transparent',
			}}
			config={{
				displayModeBar: false,
			}}
		/>
	)

}