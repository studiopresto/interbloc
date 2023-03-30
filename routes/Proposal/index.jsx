import dynamic from 'next/dynamic';
/*
Components
 */
import Box from '~ui/components/Box';
import List from '~ui/components/List';
import Preloader from '~ui/components/Preloader';
import Dot from '~ui/components/Dot';
import ProgressMultiple from '~ui/components/ProgressMultiple';
import ReactMarkdown from 'react-markdown'
/*
Icons
 */
import BurgerIcon from '~ui/icons/Burger';
import SortIcon from '~ui/icons/Sort';
import { info, relative, absolute } from './data';
import {useDispatch, useSelector} from "react-redux";
import {fetchTransaction, selectTransaction} from "~store/slices/getTransactionSlice";
import {useEffect} from "react";
import {fetchGovernanceProposal, selectGovernanceProposal} from "~store/slices/getGovernanceProposal";
import {useRouter} from "next/router";
import {isEmptyObject} from "~utils/object/detectEmptyObject";
import {STATUS} from "~config/constants";
import ErrorBlock from "~ui/components/Error";
import {formatProposalStatus} from "~utils/formatting/governanceProposals";
import {getDateFromTimestamp} from "~utils/date/getDateFromTimestamp";
import {
	formatCoinArrayToString,
	formatCoinsFromBaseDenom,
	formatFromBaseDenom,
	formatFromDenom
} from "~utils/formatting/coins";
import NumberFormat from "react-number-format";
import coinConfig from "../../coin.config";
import {getDateDifferent} from "~utils/date/getDateDifferent";
/*
Lazy components
 */
const Votes = dynamic(async () => {
	return await import('~routes/Proposal/Votes');
}, { ssr: false, loading: () => <Preloader/> });
const ValidatorVotes = dynamic(async () => {
	return await import('~routes/Proposal/ValidatorVotes');
}, { ssr: false, loading: () => <Preloader/> });



export default function ProposalPage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { proposalSlug } = router.query;
	const { data, status } = useSelector(selectGovernanceProposal);

	useEffect(() => {
		if (!!proposalSlug) {
			dispatch(fetchGovernanceProposal({ proposalSlug }));
		}
	}, [proposalSlug, dispatch]);
	if (!data && status === STATUS.REJECTED) {
		return <ErrorBlock/>;
	}
	if (!data.length && status === STATUS.PENDING) {
		return <Preloader/>;
	}

	let infoList = [];
	let totalVote = 0;
	let total = [];
	if (status === STATUS.FULFILLED && !isEmptyObject(data)){
		// Calculate total vote count
		Object.values(data.currentTallyResult).map(str => {
			const votesAsNumber = Number(str);
			totalVote += votesAsNumber;
			return votesAsNumber;
		})
		// Generate array for bar chart
		Object.values(data.currentTallyResult).map(str => {
			let value = Math.round(Number(str) / totalVote * 100)
			total.push({
				title: "",
				value: value
			})
		})
		// Manually sort the total array
		// Current order: yes, abstain, no, nwv
		// Target order: yes, no, nwv, abstain
		total = [total[0], total[2], total[3], total[1]];
		console.log(data)

		infoList = [
			["Proposer", data.proposer],
			["Type", data.content.type],
			["Submitted", getDateFromTimestamp(data.submitTime * 1000)],
			["Deposit End Time", getDateFromTimestamp(data.depositEndTime * 1000)],
			["Voting Start", getDateFromTimestamp(data.votingStartTime * 1000)],
			["Voting End", getDateFromTimestamp(data.votingEndTime * 1000)],
			// ["Initial Deposit", getDateFromTimestamp(data.votingEndTime * 1000)],
			["Total Deposit", formatCoinArrayToString(data.totalDeposit)],
			["Votes", formatCoinsFromBaseDenom(totalVote).value + " " + formatCoinsFromBaseDenom(totalVote).suffix],


		];
	}
	

	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __blue">
					<BurgerIcon/>
				</div>
				<div>
					<h1 className="h-2">Proposal</h1>
				</div>
			</div>
			{ isEmptyObject(data) && status === STATUS.PENDING ? <Preloader/> : null }
			{
				!isEmptyObject(data) && status === STATUS.FULFILLED ? (

					<div className="page-body">
				<Box title={"#" + data.proposalId + " " + data.content.title} theme={1}>
					<span className="box-body-status font-bold" style={{ color: formatProposalStatus(data.status).color }}>{formatProposalStatus(data.status).proposalStatus}</span>
					<p className="color-grey font-secondary-bold box-body-subtitle">{ }</p>
					<div className="row">
						<div className="col-12 col-lg-6">
							<List data={infoList}/>
						</div>
						<div className="col-12 col-lg-6">
							<h3 className="h-3 mb-4">Description</h3>
							<ReactMarkdown className="heading-text color-grey mb-4">{data.content.description}</ReactMarkdown>
						</div>
					</div>
				</Box>

				<Box title="Total:" theme={3} adaptiveHeight>
					<div className="row">
						<div className="col-12 col-md-4">
							<p className="color-grey font-secondary-bold box-body-subtitle">
								<NumberFormat
									className="color-grey font-secondary-bold"
									value={formatFromBaseDenom(totalVote)}
									displayType="text"
									thousandSeparator={true}
									renderText={(value, props) => {
										return <span className="font-book" {...props}>{value} {coinConfig.ticker}</span>;
									}}/>
							</p>
						</div>
						<div className="col-12 col-md-8 mt-4">
							<div className="box-body-detail d-flex justify-content-end">
								<div className="row">
									<div className="cols col-12 col-md-4 col-lg-6 mb-3">
										<p className="font-book">Quorum:</p>
										<p className="font-16 font-secondary-bold">40,35%</p>
										<p className="font-10 color-grey text-nowrap">{formatCoinsFromBaseDenom(totalVote).value + " " + formatCoinsFromBaseDenom(totalVote).suffix} of 182 m has voted</p>
									</div>
									{/* <div className="col-12 col-md-4 col-lg-6">
										<p className="font-book">Current Turnout:</p>
										<p className="font-16 font-secondary-bold">44,5%</p>
									</div> */}
								</div>
							</div>
						</div>
					</div>
					<ProgressMultiple data={total}/>
					<div className="progress-detail">
						<div className="progress-detail-item">
							<p className="font-book">Yes</p>
							<p className="font-16 font-secondary-bold mb-2">{ Math.round(data.currentTallyResult.yes / totalVote * 10000) / 100 }%</p>
							<NumberFormat
								className="color-grey font-secondary-bold"
								value={formatFromBaseDenom(data.currentTallyResult.yes)}
								displayType="text"
								thousandSeparator={true}
								renderText={(value, props) => {
									return <span className="font-book" {...props}>{value} ATOM</span>;
								}}/>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">No</p>
							<p className="font-16 font-secondary-bold mb-2">{ Math.round(data.currentTallyResult.no / totalVote * 10000) / 100 }%</p>
							<NumberFormat
								className="color-grey font-secondary-bold"
								value={formatFromBaseDenom(data.currentTallyResult.no)}
								displayType="text"
								thousandSeparator={true}
								renderText={(value, props) => {
									return <span className="font-book" {...props}>{value} ATOM</span>;
								}}/>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">NoWithVeto</p>
							<p className="font-16 font-secondary-bold mb-2">{ Math.round(data.currentTallyResult.noWithVeto / totalVote * 10000) / 100 }%</p>
							<NumberFormat
								className="color-grey font-secondary-bold"
								value={formatFromBaseDenom(data.currentTallyResult.noWithVeto)}
								displayType="text"
								thousandSeparator={true}
								renderText={(value, props) => {
									return <span className="font-book" {...props}>{value} ATOM</span>;
								}}/>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">Abstain</p>
							<p className="font-16 font-secondary-bold mb-2">{ Math.round(data.currentTallyResult.abstain / totalVote * 10000) / 100 }%</p>
							<NumberFormat
								className="color-grey font-secondary-bold"
								value={formatFromBaseDenom(data.currentTallyResult.abstain)}
								displayType="text"
								thousandSeparator={true}
								renderText={(value, props) => {
									return <span className="font-book" {...props}>{value} ATOM</span>;
								}}/>
						</div>
					</div>
				</Box>
						{/*
				<Box title="Relative Vote:" theme={3} adaptiveHeight>
					<div className="row">
						<div className="col-12 col-md-4"> 
							<p className="color-grey font-secondary-bold box-body-subtitle">73,614,498.967888 ATOM</p>
						</div>
						<div className="col-12 col-md-8">
							<div className="box-body-detail d-flex justify-content-end">
								<div className="row">
									<div className="col-12 col-md-4 col-lg-6 mb-3">
										<p className="font-book">Quorum:</p>
										<p className="font-16 font-secondary-bold">40,35%</p>
										<p className="font-10 color-grey text-nowrap">74 m of 182 m has voted</p>
									</div>
									<div className="col-12 col-md-4 col-lg-6">
										<p className="font-book">Current Turnout:</p>
										<p className="font-16 font-secondary-bold">44,5%</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ProgressMultiple data={relative}/>
					<div className="progress-detail">
						<div className="progress-detail-item">
							<p className="font-book">Yes</p>
							<p className="font-16 font-secondary-bold mb-2">12.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">No</p>
							<p className="font-16 font-secondary-bold mb-2">57.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">NoWithVeto</p>
							<p className="font-16 font-secondary-bold mb-2">18.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">Abstain</p>
							<p className="font-16 font-secondary-bold mb-2">60.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
					</div>

				</Box>

				<Box title="Absolute Vote:" theme={3} adaptiveHeight>
					<div className="row cols-wrap">
						<div className="col-total col-12 col-md-4">
							<p className="color-grey font-secondary-bold box-body-subtitle">73,614,498.967888 ATOM</p>
						</div>
						<div className="col-12 total-wrap">
							<div className="box-body-detail d-flex justify-content-end">
								<div className="row">
									<div className="col-12 col-md-4 col-lg-6 mb-3">
										<p className="font-book">Quorum:</p>
										<p className="font-16 font-secondary-bold">40,35%</p>
										<p className="font-10 color-grey text-nowrap">74 m of 182 m has voted</p>
									</div>
									<div className="col-12 col-md-4 col-lg-6">
										<p className="font-book">Current Turnout:</p>
										<p className="font-16 font-secondary-bold">44,5%</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ProgressMultiple data={absolute}/>
					<div className="progress-detail">
						<div className="progress-detail-item">
							<p className="font-book">Yes</p>
							<p className="font-16 font-secondary-bold mb-2">31.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">No</p>
							<p className="font-16 font-secondary-bold mb-2">9.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">NoWithVeto</p>
							<p className="font-16 font-secondary-bold mb-2">25.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">Abstain</p>
							<p className="font-16 font-secondary-bold mb-2">6.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
					</div>
				</Box>
				*/}
				<div className="row">
					<div className="col-12 col-lg-6">
						<Votes/>
					</div>
					<div className="col-12 col-lg-6">
						<ValidatorVotes/>
					</div>
				</div>
				<br/>
				<br/>
				<Box title="Depositors">
					<div className="table-box">
							<table className="table table-large">
								<thead>
								<tr>
									<th>Depositor</th>
									<th>TxHash</th>
									<th>
										<div className="d-flex align-items-center">
											Amount
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											Time
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
								</tr>
								</thead>
								<tbody>
								{
									data.depositors.map((depositor, index) => (
										<tr key={index}>
											<td data-title="Depositor">
												<span className="font-secondary-bold color-turquoise">{depositor.address}</span>
											</td>
											<td data-title="TxHash"><span className="font-book text-break">{depositor.hash}</span></td>
											<td data-title="Amount">
												<NumberFormat
													value={formatFromBaseDenom(depositor.amount)}
													displayType="text"
													thousandSeparator={true}
													renderText={(value, props) => {
														return <span className="font-book" {...props}>{value} {coinConfig.ticker}</span>;
													}}/>
											</td>
											<td data-title="Time"><span className="font-book">{getDateFromTimestamp(depositor.timestamp)}</span></td>
										</tr>
									))
								}
								</tbody>
							</table>
						</div>
				</Box>
			</div>
				) : (
				<ErrorBlock/>
				)
			}
		</>
	)
}