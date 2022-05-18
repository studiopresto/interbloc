import Plot from 'react-plotly.js';



export default function Mempool() {
	return (
		<>
			<p className="font-16 color-grey font-bold">Transactions pending:</p>
			<p className="h-2">24</p>
			<div className="mempool-chart">
				<Plot
					data={[
						{
							x: [1, 2, 3, 4, 5],
							y: [5, 3, 17, 12, 9],
							type: 'bar',
							marker: {
								color: '#687EFF',
							},
							cornerroundness: {
								bottomleft: 10,
							}
						}
					]}
					layout={{
						width: null,
						height: null,
						autosize: true,
						showlegend: false,
						margin: { t: 10, r: 0, b: 30, l: 30 },
						font: {
							family: 'Nexa-Book',
							color: '#8B909A',
							size: 12,
							fontWeight: 400,
						},
						paper_bgcolor: 'transparent',
						plot_bgcolor: 'transparent',
						xaxis: {
							// visible: false,
							gridcolor: '#292929',
							linecolor: '#292929',
							title: {
								text: 'Gas',
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
						yaxis: {
							// visible: false,
							gridcolor: '#292929',
							linecolor: '#292929',
							title: {
								text: 'Gas LImit',
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
						hovermode: false,
						bargap: 0.4,
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