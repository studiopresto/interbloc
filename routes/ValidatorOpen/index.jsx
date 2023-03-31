import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import moment from 'moment';
/*
Store
 */
import {fetchValidator, selectValidator} from '~store/slices/getValidatorSlice';
/*
Components
 */
import Hash from '~ui/components/Hash';
import Box from '~ui/components/Box';
import Preloader from '~ui/components/Preloader';
import Datepicker from '~ui/components/Datepicker';
import Button from '~ui/components/Button';
import Tooltip from '~ui/components/Tooltip';
import Dot from '~ui/components/Dot';
import ErrorBlock from '~ui/components/Error';
/*
Icons
 */
import DirectoryIcon from '~ui/icons/Directory';
import SortDirectionIcon from '~ui/icons/SortDirection';
import InfoIcon from '~ui/icons/Info';
import SortIcon from '~ui/icons/Sort';
import EyeIcon from '~ui/icons/Eye';
/*
Utils
 */
import {isEmptyObject} from '~utils/object/detectEmptyObject';
/*
Config
 */
import {STATUS} from '~config/constants';
import Input from "~ui/components/Input";
import Image from "next/image";
import placeholder from "~static/images/placeholder.svg";
import {
	formatCoinsFromBaseDenom,
} from "~utils/formatting/coins";
import TransactionList from "~components/TransactionList";
import {fetchBondingHistory, selectBondingHistory} from "~store/slices/getBondingHistory";
/*
Lazy components
 */
const ValidatorHistory = dynamic(async () => {
	return await import('~components/PriceStatistics');
}, { ssr: false, loading: () => <Preloader/> });



export default function ValidatorOpen() {

	const dispatch = useDispatch();
	const router = useRouter();
	const { validatorSlug } = router.query;
	const { data, status } = useSelector(selectValidator);
	const { data: bondingHistoryData, status: bondingHistoryStatus } = useSelector(selectBondingHistory);

	useEffect(() => {
		if (!!validatorSlug) {
			dispatch(fetchValidator({ validatorSlug }));
			dispatch(fetchBondingHistory());
		}
	}, [validatorSlug, dispatch]);

	if ( /* isEmptyObject(data)  && */ status === STATUS.PENDING) {
		return <Preloader/>;
	}
	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		return (
			<>
				<div className="page-header-inner justify-content-between inner-width">
					<div className="d-inline-flex align-items-center">
						<div className="page-header-thumb __violet">
							<Image src={process.env.API_SERVER + "validator/keybase/image/" + data.validator.description.identity}
								   width={64}
								   height={64}
								   alt={data.validator.description.moniker + " logo"}
								   loading={"lazy"}
							/>

						</div>
						<div>
							<h1 className="h-2">{data.validator.description.moniker}</h1>
						</div>
					</div>
					<div className="validator-header-mark ">
						{data.validator.status === "BOND_STATUS_BONDED" ? (
							<div className="dot-row">
								<p className="color-grey font-bold dot-row-title">Online</p>
								<div className="dot-row-item">
									<div className="dot-row-icon bg-success"/>
								</div>
							</div>

						) : (
							<div className="dot-row">
								<p className="color-grey font-bold dot-row-title">Offline</p>
								<div className="dot-row-item">
									<div className="dot-row-icon bg-danger"/>
								</div>
							</div>

						)}
					</div>
				</div>
				<div className="page-body">
					<Hash title="Address" value={data.validator.operatorAddress}/>
					<Box theme={3} adaptiveHeight>
						<div className="row">
							<div className="col-lg-3">
								<ul className="table-list mt-4 font-resize">
									{
										!!data?.validator.description?.website
											? (
												<li className="mb-4">
													<span className="color-grey font-bold">Website:</span>
													<Link href={"https://" + data.validator.description.website} target="_blank">
														<a href={data.validator.description.website} target="_blank" rel="noreferrer" className="font-16 font-secondary-bold">{data.validator.description.website}</a>
													</Link>
												</li>
											)
											: null
									}
									<li className="mb-4">
										<span className="color-grey font-bold">Last Update:</span>
										<span className="font-16 font-secondary-bold">{moment.unix(Date.parse(data.validator.commission.updateTime.split("T")[0]) / 1000 ).format('DD.MM.yyyy')}</span>
									</li>
								</ul>
							</div>
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									<li className="mb-4">
										<span className="color-grey font-bold">Voting Power:</span>
										<span className="font-16 font-secondary-bold">
											{formatCoinsFromBaseDenom(data.validator.tokens).value} {formatCoinsFromBaseDenom(data.validator.tokens).suffix} {/* / {data.voting_power.relative * 100}% */}
										</span>
									</li>
									<li className="mb-4">
										<span className="color-grey font-bold">Change (7 days):</span>
										<span className="font-16 font-secondary-bold">
											{ formatCoinsFromBaseDenom(data.validator.tokens - data.bondingHistory.week).value }
											{ formatCoinsFromBaseDenom(data.validator.tokens - data.bondingHistory.week).suffix }
											{ Math.abs((data.validator.tokens - data.bondingHistory.week) / data.validator.tokens) <= 0.004 ? "" : " / " + ((data.validator.tokens - data.bondingHistory.week) / data.validator.tokens).toFixed(2) + "%"}
										</span>
									</li>
								</ul>
							</div>
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									{
										!!data?.validator.commission?.commissionRates
											? (
												<li className="mb-4">
													<span className="color-grey font-bold">Commission:</span>
													<span className="font-16 font-secondary-bold">{(data.validator.commission.commissionRates.rate * Math.pow(10, -16)).toFixed(2)} %</span>
												</li>
											)
											: null
									}
								</ul>
							</div>
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									<li className="mb-4">
										<span className="color-grey font-bold">Pending Commission:</span>
										<span className="font-16 font-secondary-bold">1 ATOM</span>
									</li>
								</ul>
							</div>
						</div>
						<hr className="hr"/>
						<p className="font-secondary-bold"><span className="color-grey font-bold">Description:<br></br> </span>
							{data.validator.description.details}</p>
					</Box>
					<Box title="Validator History" theme={1}>
						<ValidatorHistory/>
					</Box>
					<div className='table-row mb-3 table-validators'>
						<div className="table-uptime">
							<div className='uptime-validators' style={{ background: '#1E1F1F' }}>
								<div className="table-header validators-header mb-4">
									<div className="row">
										<div className="col-4">
											<p className="font-20 font-bold">Delegators (Soon)</p>
										</div>
									</div>
								</div>
								<div className="table">
									<Input search/>
								</div>
								<table className="table mt-4">
									<thead>
									<tr>
										<th>Address</th>
										<th>Amount</th>
										<th>Total Value</th>
									</tr>
									</thead>
									<tbody>
									{
										Array.from({ length: 1 }).map((_, index) => (
											<tr key={index}>
												<td data-title= "Address" className='space-text'>
													<div className="d-inline-flex align-items-center">
														<div className="thumb size-30 position-left">
															<Image
																src={placeholder}
																width={30}
																height={30}
																alt="Alt"/>
														</div>
														<span className="font-secondary-bold text-break">Placeholder</span>
													</div>
												</td>
												<td data-title= "Amount" className='space-text'>
													{
														index % 2 === 0
															? <span>0</span>
															: <span>$ 99,25</span>
													}
												</td>
												<td data-title= "Total Value" className='space-text'>
													<span>$ 0</span>
												</td>
											</tr>
										))
									}

									</tbody>
								</table>
							</div>
						</div>
						<div className="table-uptime">
							<div className="depositor-box">
								<Box title="Staking Stats (Historical)">
									{bondingHistoryStatus === STATUS.FULFILLED ? (
										<>
									<div className="table-box">
										<table className="table table-large">
											<thead>
											<tr>
												<th></th>
												<th>Yesterday</th>
												<th>
													<div className="d-flex align-items-center">
														Last Week
													</div>
												</th>
												<th>
													<div className="d-flex align-items-center">
														Last Month
													</div>
												</th>
												<th>
													<div className="d-flex align-items-center">
														Last Year
													</div>
												</th>
											</tr>
											</thead>
											<tbody>
											{
												Array.from({ length: 1 }).map((_, index) => (
													<tr key={index}>

																<td data-title="">
																	<span className="font-secondary-bold color-turquoise" style={{ color: '#4FF0D7' }}>Network</span>
																</td>
																<td data-title="Yesterday"><span className="font-book">
															{((bondingHistoryData.now - bondingHistoryData.day) / bondingHistoryData.now).toFixed(2)}%
														</span></td>
																<td data-title="Last Week">
															<span className="font-book">
														{((bondingHistoryData.now - bondingHistoryData.week) / bondingHistoryData.now).toFixed(2)}%
															</span>
																</td>
																<td data-title="Last Month"><span className="font-book">
														{((bondingHistoryData.now - bondingHistoryData.month) / bondingHistoryData.now).toFixed(2)}%
															</span></td>
																<td data-title="Last Year"><span className="font-book">
														{((bondingHistoryData.now - bondingHistoryData.year) / bondingHistoryData.now).toFixed(2)}%
															</span></td>


													</tr>
												))
											}
											{
												Array.from({ length: 1 }).map((_, index) => (
													<tr key={index}>
														<td data-title="">
															<span className="font-secondary-bold color-turquoise" style={{ color: '#1A70FE' }}>Validator</span>
														</td>
														<td data-title="Yesterday"><span className="font-book">
															{((data.bondingHistory.day - data.bondingHistory.week) / data.bondingHistory.now).toFixed(2)}%
														</span></td>
														<td data-title="Last Week">
															<span className="font-book">
																{((data.bondingHistory.now - data.bondingHistory.week) / data.bondingHistory.now).toFixed(2)}%
															</span>
														</td>
														<td data-title="Last Month">
															<span className="font-book">
																{((data.bondingHistory.now - data.bondingHistory.month) / data.bondingHistory.now).toFixed(2)}%
															</span>
														</td>
														<td data-title="Last Year"><span className="font-book">
															{((data.bondingHistory.now - data.bondingHistory.year) / data.bondingHistory.now).toFixed(2)}%
														</span></td>
													</tr>
												))
											}
											</tbody>
										</table>
									</div>
										</>

									) : (
										<Preloader></Preloader>
									)}
								</Box>
							</div>
							<Box title="Uptime" adaptiveHeight>
								<div className="uptime-chart">
									<div className="uptime-chart-legend">
										<p className="font-bold color-grey chart-legend-item">
											Signed - <span className="chart-legend-icon" style={{ backgroundColor: '#1A70FE' }}/>
										</p>
										<p className="font-bold color-grey chart-legend-item">
											Missed - <span className="chart-legend-icon" style={{ backgroundColor: '#2CD7FF' }}/>
										</p>
									</div>
									<div className="uptime-row">
										{data.uptime.map((value, i) => {
											let color = value ? '#1A70FE' : '#2CD7FF';
											return (
													<div key={i} className="uptime-row-item" style={{ backgroundColor: color }}/>
												)
										}

										)}
									</div>
								</div>
							</Box>
						</div>
					</div>
					{/*
										<Box title="Uptime" adaptiveHeight>
						<div className="uptime-chart">
							<div className="uptime-chart-legend">
								<p className="font-bold color-grey chart-legend-item">
									Success - <span className="chart-legend-icon" style={{ backgroundColor: '#1A70FE' }}/>
								</p>
								<p className="font-bold color-grey chart-legend-item">
									Up - <span className="chart-legend-icon" style={{ backgroundColor: '#2CD7FF' }}/>
								</p>
							</div>
							<div className="uptime-row">
								{
									data.uptimeArray.map((option, index) => (
										<div key={index} className="uptime-row-item" style={{ backgroundColor: option ? '#1A70FE' : '#2CD7FF' }}/>
									))
								}
							</div>
						</div>
					</Box>

					*/}
					<div className="row">
						<TransactionList transactionData={data.transaction} transactionStatus={status}></TransactionList>

					</div>
				</div>
			</>
		)
	}

	return <ErrorBlock/>;
}