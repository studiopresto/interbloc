import Plot from 'react-plotly.js';
import {data} from './data';



export default function Consensus() {

	const { voting_power: { total, online }, validators } = data;
	const onlinePercent = (( online / total ) * 100).toFixed();

	return (
		<>
			<div className="row">
				<div className="col-6">
					<p className="color-grey font-bold mt-1">Voting Power <br/> Online:</p>
					<p className="font-secondary-bold color-orange font-16 mt-1">{onlinePercent}%</p>
				</div>
				<div className="col-6">
					<p className="color-grey font-bold mt-1">Number Of <br/> Validators:</p>
					<p className="font-secondary-bold color-violet font-16 mt-1">{`${validators?.active}/${validators?.total}`}</p>
				</div>
			</div>
			<div className="consensus-chart">
				<Plot
					data={[
						{
							values: [onlinePercent, ( 100 - onlinePercent )],
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
						margin: { t: 30, r: 0, b: 0, l: 0 },
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