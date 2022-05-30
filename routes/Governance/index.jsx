import dynamic from 'next/dynamic';
/*
Components
 */
import Preloader from '~ui/components/Preloader';
/*
Icons
 */
import EyeIcon from '~ui/icons/Eye';
/*
Lazy components
 */
const GovernanceChart = dynamic(async () => {
	return await import('~components/GovernanceChart');
}, { ssr: false, loading: () => <Preloader/> });
const GovernanceList = dynamic(async () => {
	return await import('~routes/Governance/List');
}, { ssr: false, loading: () => <Preloader/> });



export default function GovernancePage() {

	const data = [
		{
			title: '#68  / Community Spend Proposal',
			subtitle: 'Make Cosmos Hub the Lead Sponsor of Cosmoverse 2022',
			type: {
				label: 'Voting Period',
				value: false,
			},
			proposer: 'cosmos1udcdc278lsaawuznfk7g00vn9n5cl6yzzsrk0c',
			start: '2022-04-21 22:11:55',
			end: '2022-05-25 22:11:55',
			status: 'Remaining 12 Days',
			values: [],
		},
		{
			title: '#69  / Community Spend Proposal',
			subtitle: 'Make Cosmos Hub the Lead Sponsor of Cosmoverse 2022',
			type: {
				label: 'Voting Period',
				value: false,
			},
			proposer: 'cosmos1udcdc278lsaawuznfk7g00vn9n5cl6yzzsrk0c',
			start: '2022-04-21 22:11:55',
			end: '2022-05-25 22:11:55',
			status: 'Remaining 12 Days',
			values: [],
		},
		{
			title: '#70  / Community Spend Proposal',
			subtitle: 'Make Cosmos Hub the Lead Sponsor of Cosmoverse 2022',
			type: {
				label: 'Passed',
				value: true,
			},
			proposer: 'cosmos1udcdc278lsaawuznfk7g00vn9n5cl6yzzsrk0c',
			start: '2022-06-21 22:11:55',
			end: '2022-07-25 22:11:55',
			status: 'Remaining 12 Days',
			values: [52, 10, 10, 8],
		},
		{
			title: '#71  / Community Spend Proposal',
			subtitle: 'Make Cosmos Hub the Lead Sponsor of Cosmoverse 2022',
			type: {
				label: 'Passed',
				value: true,
			},
			proposer: 'cosmos1udcdc278lsaawuznfk7g00vn9n5cl6yzzsrk0c',
			start: '2022-06-21 22:11:55',
			end: '2022-07-25 22:11:55',
			status: 'Remaining 12 Days',
			values: [72, 10, 9, 5],
		},
		{
			title: '#72  / Community Spend Proposal',
			subtitle: 'Make Cosmos Hub the Lead Sponsor of Cosmoverse 2022',
			type: {
				label: 'Voting Period',
				value: false,
			},
			proposer: 'cosmos1udcdc278lsaawuznfk7g00vn9n5cl6yzzsrk0c',
			start: '2022-06-21 22:11:55',
			end: '2022-07-25 22:11:55',
			status: 'Remaining 12 Days',
			values: [],
		},
		{
			title: '#73  / Community Spend Proposal',
			subtitle: 'Make Cosmos Hub the Lead Sponsor of Cosmoverse 2022',
			type: {
				label: 'Passed',
				value: true,
			},
			proposer: 'cosmos1udcdc278lsaawuznfk7g00vn9n5cl6yzzsrk0c',
			start: '2022-06-21 22:11:55',
			end: '2022-07-25 22:11:55',
			status: 'Remaining 12 Days',
			values: [52, 22, 12, 10],
		},
	];

	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __turquoise">
					<EyeIcon/>
				</div>
				<div>
					<h1 className="h-2">Governance Overview</h1>
				</div>
			</div>
			<div className="page-body">
				<div className="row">
					{
						data.map((option, key) => (
							<div className="col-md-6" key={key}>
								<div className="governance-box">
									<GovernanceChart data={option}/>
								</div>
							</div>
						))
					}
				</div>
				<div className="row">
					<div className="col-12">
						<GovernanceList/>
					</div>
				</div>
			</div>
		</>
	)
}