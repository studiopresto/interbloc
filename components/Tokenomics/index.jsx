import NumberFormat from 'react-number-format';
import Plot from 'react-plotly.js';



export default function Tokenomics() {
	return (
		<>
			<div className="row">
				<div className="col-6">
					<p className="color-grey font-bold">Bonded:</p>
					<NumberFormat
						value={45349414}
						displayType="text"
						thousandSeparator={true}
						renderText={(value, props) => {
							return <p className="font-16 font-secondary-bold color-orange" {...props}>{value}</p>
						}}/>
					<p className="color-grey font-secondary-bold font-12">BTSG</p>
					<p className="mt-2">36.07 %</p>
				</div>
				<div className="col-6">
					<p className="color-grey font-bold">Unbonded:</p>
					<NumberFormat
						value={79978477}
						displayType="text"
						thousandSeparator={true}
						renderText={(value, props) => {
							return <p className="font-16 font-secondary-bold color-violet" {...props}>{value}</p>
						}}/>
					<p className="color-grey font-secondary-bold font-12">BTSG</p>
					<p className="mt-2">63.62 %</p>
				</div>
			</div>
			<div className="row">
				<div className="col-8">
					<div className="tokenomics-chart">
						<Plot
							data={[
								{
									values: [30, 20, 50],
									labels: ['', '', ''],
									type: 'pie',
									rotation: 90,
									marker: {
										colors: ['#D69F4D', '#9485FE', '#1E1F1F'],
									},
								}
							]}
							layout={{
								width: 370,
								height: 370,
								autosize: true,
								showlegend: false,
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
								hovermode: false,
							}}
							config={{
								displayModeBar: false,
							}}
							// style={{
							// 	width: '100%',
							// 	height: '100%',
							// }}
						/>
					</div>
				</div>
				<div className="col-4">
					<div className="tokenomics-legends d-flex flex-column">
						<p className="font-12 color-grey legend mb-2">
						<span className="legend-icon bg-orange"/>
						<span className="legend-title">Bonded</span>
					</p>
						<p className="font-12 color-grey legend">
						<span className="legend-icon bg-violet"/>
						<span className="legend-title">Unbonding</span>
					</p>
					</div>
				</div>
			</div>
			<div className="row align-items-center">
				<div className="col-6">
					<p className="color-grey font-bold">Staking:</p>
				</div>
				<div className="col-6">
					<div className="d-flex justify-content-end">
						<p className="font-16 font-secondary-bold">5,522,818</p>
					</div>
				</div>
			</div>
		</>
	)
}