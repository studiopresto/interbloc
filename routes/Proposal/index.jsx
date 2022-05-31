import dynamic from 'next/dynamic';
import NumberFormat from 'react-number-format';
/*
Components
 */
import Box from '~ui/components/Box';
import List from '~ui/components/List';
import Preloader from '~ui/components/Preloader';
import Dot from '~ui/components/Dot';
import ProgressMultiple from '~ui/components/ProgressMultiple';
/*
Icons
 */
import BurgerIcon from '~ui/icons/Burger';
import SortIcon from '~ui/icons/Sort';
import { info, total, relative, absolute } from './data';
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
			<div className="page-body">
				<Box title="#67" theme={1}>
					<span className="box-body-status font-bold" style={{ color: '#329DB5' }}>Voting Period</span>
					<p className="color-grey font-secondary-bold box-body-subtitle">Parameter Change: Enable liquidify module circoit breaker</p>
					<div className="row">
						<div className="col-6">
							<List data={info}/>
						</div>
						<div className="col-6">
							<h3 className="h-3 mb-4">Description</h3>
							<p className="color-grey mb-4">Living valley had silent eat merits esteem bed. In last an or went wise as left. Visited civilly am demesne so colonel he calling. So unreserved do interested increasing sentiments. Vanity day giving points within six not law. Few impression difficulty his use has comparison decisively.</p>
							<p className="color-grey mb-4">She exposed painted fifteen are noisier mistake led waiting. Surprise not wandered speedily husbands although yet end. Are court tiled cease young built fat one man taken. We highest ye friends is exposed equally in. Ignorant had too strictly followed. Astonished as travelling assistance or unreserved oh pianoforte ye. Five with seen put need tore add neat. Bringing it is he returned received raptures.</p>
							<p className="color-grey mb-4">Perceived end knowledge certainly day sweetness why cordially. Ask quick six seven offer see among. Handsome met debating sir dwelling age material. As style lived he worse dried. Offered related so visitor we private removed. Moderate do subjects to distance.</p>
						</div>
					</div>
				</Box>

				<Box title="Total:" theme={3} adaptiveHeight>
					<div className="row">
						<div className="col-4">
							<p className="color-grey font-secondary-bold box-body-subtitle">73,614,498.967888 ATOM</p>
						</div>
						<div className="col-8">
							<div className="box-body-detail d-flex justify-content-end">
								<div className="row">
									<div className="col-6">
										<p className="font-book">Quorum:</p>
										<p className="font-16 font-secondary-bold">40,35%</p>
										<p className="font-10 color-grey text-nowrap">74 m of 182 m has voted</p>
									</div>
									<div className="col-6">
										<p className="font-book">Current Turnout:</p>
										<p className="font-16 font-secondary-bold">44,5%</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<ProgressMultiple data={total}/>
					<div className="progress-detail">
						<div className="progress-detail-item">
							<p className="font-book">Yes</p>
							<p className="font-16 font-secondary-bold mb-2">17.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">No</p>
							<p className="font-16 font-secondary-bold mb-2">47.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">NoWithVeto</p>
							<p className="font-16 font-secondary-bold mb-2">30.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
						<div className="progress-detail-item">
							<p className="font-book">Abstain</p>
							<p className="font-16 font-secondary-bold mb-2">1.00%</p>
							<p className="color-grey font-secondary-bold">73,614,498.967888 ATOM</p>
						</div>
					</div>
				</Box>

				<Box title="Relative Vote:" theme={3} adaptiveHeight>
					<div className="row">
						<div className="col-4">
							<p className="color-grey font-secondary-bold box-body-subtitle">73,614,498.967888 ATOM</p>
						</div>
						<div className="col-8">
							<div className="box-body-detail d-flex justify-content-end">
								<div className="row">
									<div className="col-6">
										<p className="font-book">Quorum:</p>
										<p className="font-16 font-secondary-bold">40,35%</p>
										<p className="font-10 color-grey text-nowrap">74 m of 182 m has voted</p>
									</div>
									<div className="col-6">
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
					<div className="row">
						<div className="col-4">
							<p className="color-grey font-secondary-bold box-body-subtitle">73,614,498.967888 ATOM</p>
						</div>
						<div className="col-8">
							<div className="box-body-detail d-flex justify-content-end">
								<div className="row">
									<div className="col-6">
										<p className="font-book">Quorum:</p>
										<p className="font-16 font-secondary-bold">40,35%</p>
										<p className="font-10 color-grey text-nowrap">74 m of 182 m has voted</p>
									</div>
									<div className="col-6">
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
				<div className="row">
					<div className="col-6">
						<Votes/>
					</div>
					<div className="col-6">
						<ValidatorVotes/>
					</div>
				</div>
				<br/>
				<br/>
				<Box title="Depositors">
					<div className="table-box">
							<table className="table">
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
									Array.from({ length: 5 }).map((_, index) => (
										<tr key={index}>
											<td>
												<span className="font-secondary-bold color-turquoise">B-Harvest</span>
											</td>
											<td><span className="font-book">3456265fsff342fsfefws34125g9986341fsdf5f8s6f</span></td>
											<td>
												<NumberFormat
													value={6000000 * ( index + 1 )}
													displayType="text"
													thousandSeparator={true}
													renderText={(value, props) => {
														return <span className="font-book" {...props}>{value} ATOM</span>;
													}}/>
											</td>
											<td><span className="font-book">8 Days ago (2022-04-14 07:24:27)</span></td>
										</tr>
									))
								}
								</tbody>
							</table>
						</div>
				</Box>
			</div>
		</>
	)
}