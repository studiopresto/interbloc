import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import moment from 'moment';
import {fetchValidator, selectValidator} from 'store/slices/getValidatorSlice';
import Hash from 'ui/components/Hash';
import Box from 'ui/components/Box';
import Preloader from 'ui/components/Preloader';
import ErrorBlock from 'ui/components/Error';
import {isEmptyObject} from 'utils/object/detectEmptyObject';
import {STATUS} from 'config/constants';
import Input from 'ui/components/Input';
import Image from 'next/image';
import placeholder from '../../../public/static/images/placeholder.svg';
import {
	formatCoinsFromBaseDenom,
} from 'utils/formatting/coins';
import TransactionList from 'components/TransactionList';
import {fetchBondingHistory, selectBondingHistory} from 'store/slices/getBondingHistory';

const ValidatorHistory = dynamic(async () => {
	return await import('components/PriceStatistics');
}, {ssr: false, loading: () => <Preloader/>});

export default function ValidatorOpen() {
	
	const dispatch = useDispatch();
	const router = useRouter();
	const {validatorSlug} = router.query;
	const {data, status} = useSelector(selectValidator);
	const {data: bondingHistoryData, status: bondingHistoryStatus} = useSelector(selectBondingHistory);
	const {t} = useTranslation();
	
	useEffect(() => {
		if (!!validatorSlug) {
			dispatch(fetchValidator({validatorSlug}));
			dispatch(fetchBondingHistory());
		}
	}, [validatorSlug, dispatch]);
	
	if (status === STATUS.PENDING || status === STATUS.IDLE) {
		return <Preloader/>;
	}
	if (isEmptyObject(data) || status === STATUS.REJECTED) {
		return <ErrorBlock/>;
	}
	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		return (
			<>
				<div className="page-header-inner justify-content-between inner-width">
					<div className="d-inline-flex align-items-center">
						<div className="page-header-thumb __violet">
							<Image src={process.env.API_SERVER + 'validator/keybase/image/' + data.validator.description.identity}
							       width={64}
							       height={64}
							       alt={data.validator.description.moniker + ' logo'}
							       loading={'lazy'}
							/>
						</div>
						<div>
							<h1 className="h-2">{data.validator.description.moniker}</h1>
						</div>
					</div>
					<div className="validator-header-mark ">
						{data.validator.status === 'BOND_STATUS_BONDED'
							? (
								<div className="dot-row">
									<p className="color-grey font-bold dot-row-title">{t('labels:online')}</p>
									<div className="dot-row-item">
										<div className="dot-row-icon bg-success"/>
									</div>
								</div>)
							: (
								<div className="dot-row">
									<p className="color-grey font-bold dot-row-title">{t('labels:offline')}</p>
									<div className="dot-row-item">
										<div className="dot-row-icon bg-danger"/>
									</div>
								</div>)}
					</div>
				</div>
				<div className="page-body">
					<Hash title={t('labels:address')} value={data.validator.operatorAddress}/>
					<Box theme={3} adaptiveHeight>
						<div className="row">
							<div className="col-lg-3">
								<ul className="table-list mt-4 font-resize">
									{
										!!data?.validator.description?.website
											? (
												<li className="mb-4">
													<span className="color-grey font-bold">{t('labels:website')}:</span>
													<Link href={'https://' + data.validator.description.website} target="_blank">
														<a href={data.validator.description.website} target="_blank" rel="noreferrer"
														   className="font-16 font-secondary-bold">{data.validator.description.website}</a>
													</Link>
												</li>
											)
											: null
									}
									<li className="mb-4">
										<span className="color-grey font-bold">{t('labels:last-update')}:</span>
										<span
											className="font-16 font-secondary-bold">{moment.unix(Date.parse(data.validator.commission.updateTime.split('T')[0]) / 1000).format('DD.MM.yyyy')}</span>
									</li>
								</ul>
							</div>
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									<li className="mb-4">
										<span className="color-grey font-bold">{t('labels:voting-power')}:</span>
										<span className="font-16 font-secondary-bold">
											{formatCoinsFromBaseDenom(data.validator.tokens).value} {formatCoinsFromBaseDenom(data.validator.tokens).suffix}
										</span>
									</li>
									<li className="mb-4">
										<span className="color-grey font-bold">{t('labels:change-days', {count: 7})}:</span>
										<span className="font-16 font-secondary-bold">
											{formatCoinsFromBaseDenom(data.validator.tokens - data.bondingHistory.week).value}
											{formatCoinsFromBaseDenom(data.validator.tokens - data.bondingHistory.week).suffix}
											{Math.abs((data.validator.tokens - data.bondingHistory.week) / data.validator.tokens) <= 0.004 ? '' : ' / ' + ((data.validator.tokens - data.bondingHistory.week) / data.validator.tokens).toFixed(2) + '%'}
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
													<span className="color-grey font-bold">{t('labels:commission')}:</span>
													<span
														className="font-16 font-secondary-bold">{(data.validator.commission.commissionRates.rate * Math.pow(10, -16)).toFixed(2)} %</span>
												</li>
											)
											: null
									}
								</ul>
							</div>
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									<li className="mb-4">
										<span className="color-grey font-bold">{t('labels:pending-commission')}:</span>
										<span className="font-16 font-secondary-bold">1 ATOM</span>
									</li>
								</ul>
							</div>
						</div>
						<hr className="hr"/>
						<p className="font-secondary-bold">
							<span className="color-grey font-bold">{t('labels:description')}:<br></br></span>
							{data.validator.description.details}
						</p>
					</Box>
					<Box title={t('common:box-validator-history')} theme={1}>
						<ValidatorHistory/>
					</Box>
					<div className="table-row mb-3 table-validators">
						<div className="table-uptime">
							<div className="uptime-validators" style={{background: '#1E1F1F'}}>
								<div className="table-header validators-header mb-4">
									<div className="row">
										<div className="col-4">
											<p className="font-20 font-bold">{t('common:box-delegators')} ({t('labels:soon')})</p>
										</div>
									</div>
								</div>
								<div className="table">
									<Input search/>
								</div>
								<table className="table mt-4">
									<thead>
									<tr>
										<th>{t('labels:address')}</th>
										<th>{t('labels:amount')}</th>
										<th>{t('labels:total-value')}</th>
									</tr>
									</thead>
									<tbody>
									{
										Array.from({length: 1}).map((_, index) => (
											<tr key={index}>
												<td data-title={t('labels:address')} className="space-text">
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
												<td data-title={t('labels:amount')} className="space-text">
													{
														index % 2 === 0
															? <span>0</span>
															: <span>$ 99,25</span>
													}
												</td>
												<td data-title={t('labels:total-value')} className="space-text">
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
								<Box title={`${t('common:box-staking-stats')} (${t('labels:historical')})`}>
									{bondingHistoryStatus === STATUS.FULFILLED
										? (
											<div className="table-box">
												<table className="table table-large">
													<thead>
													<tr>
														<th/>
														<th>{t('labels:yesterday')}</th>
														<th>
															<div className="d-flex align-items-center">
																{t('labels:last-week')}
															</div>
														</th>
														<th>
															<div className="d-flex align-items-center">
																{t('labels:last-month')}
															</div>
														</th>
														<th>
															<div className="d-flex align-items-center">
																{t('labels:last-year')}
															</div>
														</th>
													</tr>
													</thead>
													<tbody>
													{Array.from({length: 1}).map((_, index) => (
														<tr key={index}>
															<td data-title="">
																<span className="font-secondary-bold color-turquoise"
																      style={{color: '#4FF0D7'}}>Network</span>
															</td>
															<td data-title={t('labels:yesterday')}>
																<span
																	className="font-book">{((bondingHistoryData.now - bondingHistoryData.day) / bondingHistoryData.now).toFixed(2)}%</span>
															</td>
															<td data-title={t('labels:last-week')}>
																<span
																	className="font-book">{((bondingHistoryData.now - bondingHistoryData.week) / bondingHistoryData.now).toFixed(2)}%</span>
															</td>
															<td data-title={t('labels:last-month')}>
																<span
																	className="font-book">{((bondingHistoryData.now - bondingHistoryData.month) / bondingHistoryData.now).toFixed(2)}%</span>
															</td>
															<td data-title={t('labels:last-year')}>
																<span
																	className="font-book">{((bondingHistoryData.now - bondingHistoryData.year) / bondingHistoryData.now).toFixed(2)}%</span>
															</td>
														</tr>))}
													{Array.from({length: 1}).map((_, index) => (
														<tr key={index}>
															<td data-title="">
																<span className="font-secondary-bold color-turquoise"
																      style={{color: '#1A70FE'}}>Validator</span>
															</td>
															<td data-title="Yesterday">
																<span
																	className="font-book">{((data.bondingHistory.day - data.bondingHistory.week) / data.bondingHistory.now).toFixed(2)}%</span>
															</td>
															<td data-title="Last Week">
																<span
																	className="font-book">{((data.bondingHistory.now - data.bondingHistory.week) / data.bondingHistory.now).toFixed(2)}%</span>
															</td>
															<td data-title="Last Month">
																<span
																	className="font-book">{((data.bondingHistory.now - data.bondingHistory.month) / data.bondingHistory.now).toFixed(2)}%</span>
															</td>
															<td data-title="Last Year">
																<span
																	className="font-book">{((data.bondingHistory.now - data.bondingHistory.year) / data.bondingHistory.now).toFixed(2)}%</span>
															</td>
														</tr>))}
													</tbody>
												</table>
											</div>)
										: <Preloader/>}
								</Box>
							</div>
							<Box title={t('labels:uptime')} adaptiveHeight>
								<div className="uptime-chart">
									<div className="uptime-chart-legend">
										<p className="font-bold color-grey chart-legend-item">
											{t('labels:signed')} - <span className="chart-legend-icon" style={{backgroundColor: '#1A70FE'}}/>
										</p>
										<p className="font-bold color-grey chart-legend-item">
											{t('labels:missed')} - <span className="chart-legend-icon" style={{backgroundColor: '#2CD7FF'}}/>
										</p>
									</div>
									<div className="uptime-row">
										{data.uptime.map((value, i) => {
												let color = value ? '#1A70FE' : '#2CD7FF';
												return (
													<div key={i} className="uptime-row-item" style={{backgroundColor: color}}/>
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
						<TransactionList transactionData={data.transaction} transactionStatus={status}/>
					</div>
				</div>
			</>
		)
	}
	
	return null
}