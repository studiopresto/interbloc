import PropTypes from 'prop-types';
import Plot from "react-plotly.js";
/*
Components
 */
import Box from '~ui/components/Box';
import ErrorBlock from '~ui/components/Error';
/*
Utils
 */
import hashShortening from '~utils/string/hashShortening';
import {isEmptyObject} from '~utils/object/detectEmptyObject';
/*
Config
 */
import {styles} from '~config/chart';

export default function GovernanceChart({ data = {} }) {

	if (isEmptyObject(data)) {
		return <ErrorBlock/>;
	}

	return (
		<Box theme={1} title={data.title}>
			<span className="box-body-status font-bold" style={{ color: data.type.value ? '#2BBF6F' : '#329DB5' }}>{data.type.label}</span>
			<p className="color-grey font-secondary-bold box-body-subtitle">{data.subtitle}</p>
			<div className="row">
				<div className="col-7">
					<ul className="table-list mt-5">
						<li className="mb-4">
							<span className="color-grey font-bold">Proposer:</span>
							<span className="font-16 font-secondary-bold color-primary">{hashShortening(data.proposer)}</span>
						</li>
						<li className="mb-4">
							<span className="color-grey font-bold">Voting Start:</span>
							<span className="font-16 font-secondary-bold">{data.start}</span>
						</li>
						<li className="mb-4">
							<span className="color-grey font-bold">Voting End:</span>
							<span className="font-16 font-secondary-bold">{data.end}</span>
						</li>
						<li>
							<span className="color-grey font-bold">Status:</span>
							<span className="font-16 font-secondary-bold">{data.status}</span>
						</li>
					</ul>
				</div>
				<div className="col-5">
					<div className="governance-chart">
						<Plot
							data={[
								{
									values: data.values,
									labels: [`yes: ${data.values[0]}%`, `no: ${data.values[1]}%`, `veto: ${data.values[2]}%`, `abstain: ${data.values[3]}%`],
									type: 'pie',
									hole: .91,
									marker: {
										colors: ['#4FF0D7', '#1A70FE', '#2CD7FF', '#323232'],
									},
									textinfo: 'none',
									sort: false,
								}
							]}
							layout={{
								width: null,
								height: null,
								autosize: true,
								showlegend: true,
								legend: {
									x: 0.33,
									y: 0.5,
								},
								margin: {t: 0, r: 0, b: 0, l: 0},
								font: styles.font,
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
											size: 14,
											family: 'Nexa-Book',
											color: '#CFCFCF',
										},
										showarrow: false,
										text: !data.values.length ? 'no voting yet' : '',
										y: .5
									}
								],
							}}
							config={styles.config}
							style={styles.style}
						/>
					</div>
				</div>
			</div>
		</Box>
	)
}

GovernanceChart.propTypes = {
	data: PropTypes.object,
};