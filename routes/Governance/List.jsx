/*
Components
 */
import SelectCustom from '~ui/components/Select';
import Pagination from '~components/Pagination';
import Dot from '~ui/components/Dot';
/*
Icons
 */
import SortIcon from '~ui/icons/Sort';
import NumberFormat from "react-number-format";
import {useDispatch, useSelector} from "react-redux";
import {fetchGovernanceProposals, selectGovernanceProposals} from "~store/slices/getGovernanceProposals";
import {useEffect} from "react";
import {STATUS} from "~config/constants";
import ErrorBlock from "~ui/components/Error";
import Preloader from "~ui/components/Preloader";
import {formatCoinsFromBaseDenom, formatFromBaseDenom} from "~utils/formatting/coins";
import {formatProposalStatus} from "~utils/formatting/governanceProposals";
import coinConfig from "../../coin.config";
import {getDateFromTimestamp} from "~utils/date/getDateFromTimestamp";
import routes from "~config/routes";
import Link from "next/link";



export default function GovernanceList() {

	const options = [
		{ value: 'rejected', label: 'Passed' },
		{ value: 'passed', label: 'Rejected' },
		{ value: 'voting', label: 'Voting Period' }
	];


	const handleChange = (e) => {
		console.log(e);
	}

	let page = 1
	const dispatch = useDispatch();
	const { data, status } = useSelector(selectGovernanceProposals);

	useEffect(() => {

	}, [dispatch]);

	if (data == null && status === STATUS.REJECTED) {
		return <ErrorBlock/>
	}

	if (!data.length && status === STATUS.PENDING) {
		return <Preloader/>;
	}
	if (status === STATUS.FULFILLED && data.proposals.length) {
		return (
			<div className="table-box mt-2">
				<div className="table-header mb-4">
					<div className="row">
						<div className="col-12 col-md-4">
							<p className="font-20 font-bold">List of Governance</p>
						</div>
						<div className="col-12 col-md-8 governance-form">
							<div className="d-flex align-items-center justify-content-end">
								<p className="color-grey mr-3">Filter by:</p>
								<SelectCustom options={options} onChange={handleChange}/>
							</div>
						</div>
					</div>
				</div>
				<table className="table table-large">
					<thead>
					<tr>
						<th>#ID</th>
						<th>Title</th>
						<th>
							<div className="d-flex align-items-center">
								Status
								<Dot>
									<SortIcon/>
								</Dot>
							</div>
						</th>
						<th>
							<div className="d-flex align-items-center">
								Voting Start
								<Dot>
									<SortIcon/>
								</Dot>
							</div>
						</th>
						<th>
							<div className="d-flex align-items-center">
								Submit Time
								<Dot>
									<SortIcon/>
								</Dot>
							</div>
						</th>
						<th>
							<div className="d-flex align-items-center">
								Total Deposit
								<Dot>
									<SortIcon/>
								</Dot>
							</div>
						</th>
					</tr>
					</thead>
					<tbody>
					{
						data.proposals.map((proposal, key) => (
							<tr key={key}>
								<td data-title="#ID">
									<Link href={`${routes.public.proposal}/${proposal.proposalId}`}>
										<a>
											<span className="color-grey font-book">#{proposal.proposalId}</span>

										</a>
									</Link>
								</td>
								<td data-title="Title">
									<Link href={`${routes.public.proposal}/${proposal.proposalId}`}>
										<a>
											<span className="color-turquoise font-secondary-bold">{ proposal.content.title }</span>

										</a>
									</Link>
								</td>
								<td data-title="Status">
								<span className="table-status font-bold"
									  style={{color: formatProposalStatus(proposal.status).color}}>
									{formatProposalStatus(proposal.status).proposalStatus}
								</span>
								</td>
								<td data-title="Voting Start"><span className="font-book">{ getDateFromTimestamp(proposal.votingStartTime * 1000)}</span></td>
								<td data-title="Submit Time"><span className="font-book">{ getDateFromTimestamp(proposal.votingEndTime * 100)}</span></td>
								<td data-title="Total Deposit">
									<NumberFormat
										value={Math.round(formatFromBaseDenom(proposal.totalDeposit[0].amount * 100)) / 100}
										displayType="text"
										thousandSeparator={true}
										renderText={(value, props) => {
											return <span className="font-book" {...props}>{value} ATOM</span>;

										}}/>
								</td>

							</tr>
						))
					}

					</tbody>
				</table>
				{/*
				<div className="d-flex justify-content-center pt-5">
					<Pagination/>
				</div>
			 */ }
			</div>
		)
	}
}