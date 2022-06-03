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
/*
Lazy components
 */
const PriceStatistics = dynamic(async () => {
	return await import('~components/PriceStatistics');
}, { ssr: false, loading: () => <Preloader/> });



export default function ValidatorOpen() {

	const dispatch = useDispatch();
	const router = useRouter();
	const { validatorSlug } = router.query;
	const { data, status } = useSelector(selectValidator);

	useEffect(() => {
		if (!!validatorSlug) {
			dispatch(fetchValidator({ validatorSlug }));
		}
	}, [validatorSlug, dispatch]);

	if (isEmptyObject(data) && status === STATUS.PENDING) {
		return <Preloader/>;
	}

	if (!isEmptyObject(data) && status === STATUS.FULFILLED) {
		return (
			<>
				<div className="page-header-inner justify-content-between">
					<div className="d-inline-flex align-items-center">
						<div className="page-header-thumb __violet">
							<DirectoryIcon/>
						</div>
						<div>
							<h1 className="h-2">{data.name}</h1>
						</div>
					</div>
					<div className="validator-header-mark">
						<div className="dot-row">
							<p className="color-grey font-bold dot-row-title">Jailed</p>
							<div className="dot-row-item">
								<div className="dot-row-icon bg-success"/>
							</div>
						</div>
						<div className="dot-row mt-3">
							<p className="color-grey font-bold dot-row-title">Running</p>
							<div className="dot-row-item">
								<div className="dot-row-icon bg-danger"/>
							</div>
						</div>
					</div>
				</div>
				<div className="page-body">
					<Hash title="Address" value={data.validator}/>
					<Box theme={3} adaptiveHeight>
						<div className="row">
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									{
										!!data?.details?.website
											? (
												<li className="mb-4">
													<span className="color-grey font-bold">Website:</span>
													<Link href={data.details.website} target="_blank">
														<a target="_blank" className="font-16 font-secondary-bold">{data.details.website}</a>
													</Link>
												</li>
											)
											: null
									}
									<li className="mb-4">
										<span className="color-grey font-bold">Last Update:</span>
										<span className="font-16 font-secondary-bold">{moment.unix(data.details.last_update).format('DD.MM.yyyy')}</span>
									</li>
								</ul>
							</div>
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									<li className="mb-4">
										<span className="color-grey font-bold">Voting Power:</span>
										<span className="font-16 font-secondary-bold">
											{data.voting_power.absolute} / {data.voting_power.relative * 100}%
										</span>
									</li>
									<li className="mb-4">
										<span className="color-grey font-bold">Charge (7 days):</span>
										<span className="font-16 font-secondary-bold">
											{data.voting_power.change} / ${data.voting_power.change_relative * 100}%
										</span>
									</li>
								</ul>
							</div>
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									{
										!!data?.details?.comission
											? (
												<li className="mb-4">
													<span className="color-grey font-bold">Comission:</span>
													<span className="font-16 font-secondary-bold">{(data.details.comission * 100).toFixed(0)} %</span>
												</li>
											)
											: null
									}
								</ul>
							</div>
							<div className="col-lg-3">
								<ul className="table-list mt-4">
									<li className="mb-4">
										<span className="color-grey font-bold">Pending Comission:</span>
										<span className="font-16 font-secondary-bold">1 ATOM</span>
									</li>
								</ul>
							</div>
						</div>
						<hr className="hr"/>
						<p className="font-secondary-bold"><span className="color-grey font-bold">Description: </span>
							Loremo wirds kilo Lima DElta Charlie Xray Zulu Tango Foxtrott</p>
					</Box>
					<Box title="Price Statistics" theme={1}>
						<PriceStatistics/>
					</Box>
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
					<div className="row">
						<div className="col-12">
							<div className="table-box mt-5">
								<div className="table-header d-flex align-items-center justify-content-between">
									<p className="font-16">
									<span className="mr-3">
										<SortDirectionIcon/>
									</span>
										Latest 43 from a total of
										<span className="color-turquoise"> 132</span> transaction ( +1 <span
										className="color-turquoise">Pending</span> )
									</p>
									<div className="d-flex align-items-center">
										<p className="color-grey mr-2">From:</p>
										<Datepicker size="md"/>
										<p className="color-grey mr-2 ml-4">To:</p>
										<Datepicker size="md"/>
										<div className="btns-group ml-4">
											<Button size="md" color="blue">Filter</Button>
											<Button size="md">Clear</Button>
										</div>
									</div>
								</div>
								<table className="table">
									<thead>
									<tr>
										<th/>
										<th>Txs Hash</th>
										<th>
											<div className="d-flex align-items-center">
												Method
												<Tooltip
													text="On recommend tolerably my belonging or am. Mutual has cannot beauty indeed now sussex merely you. It possible no husbands jennings ye offended packages pleasant he. Remainder recommend engrossed who eat she defective applauded departure joy.">
													<Dot>
														<InfoIcon/>
													</Dot>
												</Tooltip>
											</div>
										</th>
										<th>
											<div className="d-flex align-items-center">
												Block
												<Dot>
													<SortIcon/>
												</Dot>
											</div>
										</th>
										<th>
											<div className="d-flex align-items-center">
												Age
												<Dot>
													<SortIcon/>
												</Dot>
											</div>
										</th>
										<th>From</th>
										<th/>
										<th>To</th>
										<th>Value</th>
										<th>Txn Fee</th>
										<th/>
									</tr>
									</thead>
									<tbody>
									{
										Array.from({length: 6}).map((_, index) => (
											<tr key={index}>
												<td>
													<Button icon color="transparent">
														<EyeIcon/>
													</Button>
												</td>
												<td>
													<span
														className="color-turquoise font-secondary-bold font-hash">cosmosvaloper14kn0kk33szpwus9nh8n87fjel8djx0y070ymmj</span>
												</td>
												<td>
													<span className="color-violet font-12 font-bold status">Deposit</span>
												</td>
												<td>
													<span className="font-book">{234234 * (index + 2)}</span>
												</td>
												<td>
													<span className="font-book">{1 + (index * 3)}s ago</span>
												</td>
												<td>
													<span className="font-book font-hash">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
												</td>
												<td>
												<span className="font-12 font-bold status status-md"
															style={{color: index % 2 === 0 ? '#4D8C2F' : '#BCB96C'}}>
													{index % 2 === 0 ? 'In' : 'Out'}
												</span>
												</td>
												<td>
													<span className="font-book font-hash">0xc6fcvzc6fsdf68678z3345v6546zc578zcv99790987987</span>
												</td>
												<td>
													<span className="font-book">0.034 Ether</span>
												</td>
												<td>
													<span className="font-book">0.00034556876345</span>
												</td>
												<td/>
											</tr>
										))
									}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</>
		)
	}

	return <ErrorBlock/>;
}