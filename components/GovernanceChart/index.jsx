import PropTypes from 'prop-types';
import dynamic from "next/dynamic";

const Plot = dynamic(import('react-plotly.js'), {
	ssr: false
})/*
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
import {formatProposalStatus} from "~utils/formatting/governanceProposals";
import {getDateFromTimestamp} from "~utils/date/getDateFromTimestamp";
import {getDateDifferent} from "~utils/date/getDateDifferent";

export default function GovernanceChart({ data = {} }) {

	if (isEmptyObject(data)) {
		return <ErrorBlock/>;
	}

	const proposalStatus = formatProposalStatus(data.status)
	let totalVote = 0;
	let absoluteChartData = Object.values(data.currentTallyResult).map(str => {
		const votesAsNumber = Number(str);
		totalVote += votesAsNumber;
		return votesAsNumber;
	})
	let relativeChartData = Object.values(absoluteChartData).map( i => {
		return Math.round(i / totalVote * 100) / 100;
	})
	console.log(data)
	return (
		<Box theme={1} title={data.title}>
			<span className="box-body-status font-bold" style={{ color: proposalStatus.color }}>{proposalStatus.proposalStatus}</span>
			<p className="color-light-grey font-secondary-bold box-body-subtitle mb-4">{data.content.title}</p>
			<div className="row">
				<div className="col-12 col-md-6">
					<ul className="table-list mt-5">
						<li className="mb-4">
							<span className="color-grey font-bold">Proposer:</span>
							<span className="font-16 font-secondary-bold color-primary">{ data.proposer ? hashShortening(data.proposer) : '' }</span>
						</li>
						<li className="mb-4">
							<span className="color-grey font-bold">Voting Start:</span>
							<span className="font-16 font-secondary-bold">{ getDateFromTimestamp(data.votingStartTime * 1000)}</span>
						</li>
						<li className="mb-4">
							<span className="color-grey font-bold">Voting End:</span>
							<span className="font-16 font-secondary-bold">{getDateFromTimestamp(data.votingEndTime * 1000)}</span>
						</li>
						<li>
							<span className="color-grey font-bold">Status:</span>
							<span className="font-16 font-secondary-bold">{getDateDifferent(new Date(), data.votingEndTime * 1000)}</span>
						</li>
					</ul>
				</div>
				<div className="col-12 col-md-6">
					<div className="governance-chart">
						<Plot
							data={[
								{
									values: absoluteChartData,
									labels: [`yes: ${Math.round(relativeChartData[0] * 10000) / 100}%`, `no: ${Math.round(relativeChartData[1] * 10000 ) /100}%`, `veto: ${Math.round(relativeChartData[2] * 10000) / 100}%`, `abstain: ${Math.round(relativeChartData[3] * 10000) / 100}%`],
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
										text: totalVote === "0" ? 'no voting yet' : '',
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
