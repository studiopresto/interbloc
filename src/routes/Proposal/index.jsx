import dynamic from 'next/dynamic';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import ReactMarkdown from 'react-markdown'
import Box from 'ui/components/Box';
import List from 'ui/components/List2';
import Preloader from 'ui/components/Preloader';
import Dot from 'ui/components/Dot';
import ProgressMultiple from 'ui/components/ProgressMultiple';
import BurgerIcon from 'ui/icons/Burger';
import SortIcon from 'ui/icons/Sort';
import {useEffect} from 'react';
import {fetchGovernanceProposal, selectGovernanceProposal} from 'store/slices/getGovernanceProposal';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {STATUS} from 'config/constants';
import ErrorBlock from 'ui/components/Error';
import {formatProposalStatus} from 'utils/formatting/governanceProposals';
import {getDateFromTimestamp} from 'utils/date/getDateFromTimestamp';
import {formatCoinsFromBaseDenom, formatFromBaseDenom} from 'utils/formatting/coins';
import NumberFormat from 'react-number-format';
import coinConfig from '../../../coin.config';
import {extractProposalData} from 'utils/formatting/proposal';

const Votes = dynamic(async () => {
	return await import('./Votes');
}, {ssr: false, loading: () => <Preloader/>});
const ValidatorVotes = dynamic(async () => {
	return await import('./ValidatorVotes');
}, {ssr: false, loading: () => <Preloader/>});

export default function ProposalPage() {
	const dispatch = useDispatch();
	const router = useRouter();
	const {proposalSlug} = router.query;
	const {data, status} = useSelector(selectGovernanceProposal);
	const {t} = useTranslation();
	
	useEffect(() => {
		if (!!proposalSlug) {
			dispatch(fetchGovernanceProposal({proposalSlug}));
		}
	}, [proposalSlug, dispatch]);
	
	let infoList = [];
	let totalVote = 0;
	let total = [];
	if (status === STATUS.FULFILLED && !isEmptyObject(data)) {
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
				title: '',
				value: value
			})
		})
		// Manually sort the total array
		// Current order: yes, abstain, no, nwv
		// Target order: yes, no, nwv, abstain
		total = [total[0], total[2], total[3], total[1]];
		
		infoList = extractProposalData(data, totalVote, t);
	}
	
	return (
		<>
			<div className="page-header-inner">
				<div className="page-header-thumb __blue">
					<BurgerIcon/>
				</div>
				<div>
					<h1 className="h-2">{t('common:page-proposal')}</h1>
				</div>
			</div>
			{status === STATUS.PENDING || status === STATUS.IDLE ? <Preloader/> : null}
			{isEmptyObject(data) || status === STATUS.REJECTED ? <ErrorBlock/> : null}
			{!isEmptyObject(data) && status === STATUS.FULFILLED ? (
				<div className="page-body">
					<Box title={'#' + data.proposalId + ' ' + data.content.title} theme={1}>
						<span className="box-body-status font-bold"
						      style={{color: formatProposalStatus(data.status).color}}>{formatProposalStatus(data.status).proposalStatus}</span>
						<p className="color-grey font-secondary-bold box-body-subtitle">{}</p>
						<div className="row">
							<div className="col-12 col-lg-6">
								<List data={infoList}/>
							</div>
							<div className="col-12 col-lg-6">
								<h3 className="h-3 mb-4">{t('labels:description')}</h3>
								<ReactMarkdown className="heading-text color-grey mb-4">{data.content.description}</ReactMarkdown>
							</div>
						</div>
					</Box>
					<Box title={`${t('labels:total')}:`} theme={3} adaptiveHeight>
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
											<p className="font-book">{t('labels:quorum')}:</p>
											<p className="font-16 font-secondary-bold">40,35%</p>
											<p className="font-10 color-grey text-nowrap">
												{t('labels:count-of-total', {
													count: `${formatCoinsFromBaseDenom(totalVote).value} ${formatCoinsFromBaseDenom(totalVote).suffix}`,
													total: 182
												})}
											</p>
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
								<p className="font-book">{t('labels:yes')}</p>
								<p
									className="font-16 font-secondary-bold mb-2">{Math.round(data.currentTallyResult.yes / totalVote * 10000) / 100}%</p>
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
								<p className="font-book">{t('labels:no')}</p>
								<p
									className="font-16 font-secondary-bold mb-2">{Math.round(data.currentTallyResult.no / totalVote * 10000) / 100}%</p>
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
								<p className="font-book">{t('labels:no-with-veto')}</p>
								<p
									className="font-16 font-secondary-bold mb-2">{Math.round(data.currentTallyResult.noWithVeto / totalVote * 10000) / 100}%</p>
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
								<p className="font-book">{t('labels:abstain')}</p>
								<p
									className="font-16 font-secondary-bold mb-2">{Math.round(data.currentTallyResult.abstain / totalVote * 10000) / 100}%</p>
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
						{/*<div className="col-12 col-lg-6">*/}
						{/*	<Votes/>*/}
						{/*</div>*/}
						<div className="col-12">
							<ValidatorVotes/>
						</div>
					</div>
					<br/>
					<br/>
					<Box title={t('common:box-depositors')}>
						<div className="table-box">
							<table className="table table-large">
								<thead>
								<tr>
									<th>{t('labels:depositor')}</th>
									<th>{t('labels:txs-hash')}</th>
									<th>
										<div className="d-flex align-items-center">
											{t('labels:amount')}
											<Dot>
												<SortIcon/>
											</Dot>
										</div>
									</th>
									<th>
										<div className="d-flex align-items-center">
											{t('labels:time')}
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
											<td data-title={t('labels:depositor')}>
												<span className="font-secondary-bold color-turquoise">{depositor.address}</span>
											</td>
											<td data-title={t('labels:txs-hash')}>
												<span className="font-book text-break">{depositor.hash}</span>
											</td>
											<td data-title={t('labels:amount')}>
												<NumberFormat
													value={formatFromBaseDenom(depositor.amount)}
													displayType="text"
													thousandSeparator={true}
													renderText={(value, props) => {
														return <span className="font-book" {...props}>{value} {coinConfig.ticker}</span>;
													}}/>
											</td>
											<td data-title={t('labels:time')}>
												<span className="font-book">{getDateFromTimestamp(depositor.timestamp)}</span>
											</td>
										</tr>
									))
								}
								</tbody>
							</table>
						</div>
					</Box>
				</div>
			) : null}
		</>
	)
}