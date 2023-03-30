import Image from 'next/image';
import Link from 'next/link';
import NumberFormat from 'react-number-format';
import {useDispatch, useSelector} from "react-redux";

/*
Components
 */
import Box from '~ui/components/Box';
import Button from '~ui/components/Button';
import Input from '~ui/components/Input';
import Card from '~ui/components/Card';
import Progress from '~ui/components/Progress';
import Dot from '~ui/components/Dot';
import placeholder from '~static/images/placeholder.svg';
import SelectCustom from '~ui/components/Select';


/*
Icons
 */
import UserIcon from '~ui/icons/User';
import GridIcon from '~ui/icons/Grid';
import UnionIcon from '~ui/icons/Union';
import RepeatIcon from '~ui/icons/Repeat';
import SortIcon from '~ui/icons/Sort';
/*
Config
 */
import routes from '~config/routes';
/*
Store
 */
import {fetchValidators, selectValidators} from "~store/slices/getValidatorsSlice";
import {fetchTokenomics, selectTokenomics} from "~store/slices/getTokenomicsSlice";
import {fetchChainStats, selectChainStats} from "~store/slices/getChainStats";

import {useEffect, useState} from "react";
import {STATUS} from "~config/constants";
import Preloader from "~ui/components/Preloader";
import ErrorBlock from "~ui/components/Error";
import {formatCoinsFromBaseDenom, formatCoinsToReadable, formatFromBaseDenom} from "~utils/formatting/coins";
import coinConfig from "../../coin.config";




export default function ValidatorsPage() {

	const dispatch = useDispatch();
	const { data, status } = useSelector(selectValidators);
	const { data: tokenomicsData, status: tokenomicsStatus } = useSelector(selectTokenomics);
	const { data: chainStatsData, status: chainStatsStatus } = useSelector(selectChainStats);
	const [active, setActive] = useState(1)

	useEffect(() => {
		dispatch(fetchValidators({ status: "" }))
		dispatch(fetchChainStats())
		dispatch(fetchTokenomics())
	}, [dispatch])

	if (!data && status === STATUS.REJECTED) {
		return <ErrorBlock/>;
	}
	if (status === STATUS.PENDING) {
		return <Preloader/>;
	}

	if (data.length > 0 && status === STATUS.FULFILLED) {
		let sorted_data = Array.from(data).sort((a, b) => parseInt(b.tokens) - parseInt(a.tokens))

		let aggregated = {
			"totalVotingPower": 0,
			"cumulativeShare": {},

		}
		let activeValidators = {
			"totalVotingPower": 0,
			"cumulativeShare": {},
			validators: []

		};
		let inactiveValidators ={
			"totalVotingPower": 0,
			"cumulativeShare": {},
			validators: []
		};


		sorted_data.forEach( (validator, index) => {
			aggregated.totalVotingPower += parseInt(validator.tokens);
			aggregated.cumulativeShare[index] = aggregated.totalVotingPower;
			if (validator.status === "BOND_STATUS_BONDED"){
				activeValidators.validators.push(validator);
				activeValidators.totalVotingPower += parseInt(validator.tokens);
				activeValidators.cumulativeShare[index] = aggregated.totalVotingPower;

			} else {
				inactiveValidators.validators.push(validator);
				inactiveValidators.totalVotingPower += parseInt(validator.tokens);
				inactiveValidators.cumulativeShare[index] = aggregated.totalVotingPower;
			}
		})

		let validator_lists = [
			inactiveValidators.validators,
			activeValidators.validators
		];

		const { supply, bonded, unbonding } = tokenomicsData;
		const { avgBlockTime, currentHeight: currentDBHeight } = chainStatsData;

		return (
			<>
					<div className='header-wrap'>
						<div className="page-header-inner">
							<div className="page-header-thumb __blue">
								<UserIcon/>
							</div>
							<div>
								<h1 className="h-2">Validators</h1>
								<p className="h-6">More Information About Validators</p>
							</div>
						</div>
						{/*}
						<div className="detail page-body-detail">
							<div className="detail-list">
								<div className="detail-list-item">
									<p className="font-16 font-secondary-bold mb-1">${usdPrice}</p>
									<p className="color-grey font-bold">Price</p>
								</div>
								<div className="detail-list-item">
									<p className="font-16 font-secondary-bold mb-1">
										<NumberFormat
											value={currentDBHeight}
											displayType="text"
											thousandSeparator={true}
											renderText={(value, props) => {
												return <p className="font-secondary-bold" {...props}>{value}</p>;
											}}/>
									</p>
									<p className="color-grey font-bold">Height</p>
								</div>
								<div className="detail-list-item">
									<p className="font-16 font-secondary-bold mb-1">{formatCoinsFromBaseDenom(bonded).value} {formatCoinsFromBaseDenom(bonded).suffix}</p>
									<p className="color-grey font-bold">Bonded</p>
								</div>
								<div className="detail-list-item">
									<p className="font-16 font-secondary-bold mb-1">
										15%
									</p>
									<p className="color-grey font-bold">Inflation</p>
								</div>
								<div className="detail-list-item">
									<p className="font-16 font-secondary-bold mb-1">44 M</p>
									<p className="color-grey font-bold">Community Pool</p>
								</div>
							</div>
						</div> */}
					</div>		
						<div className="page-body">
							<div className="row">
								<div className="col-xl-3 col-md-6">
									<Card theme={1} icon={<GridIcon/>} color="turquoise">
										<p className="color-grey font-16 font-book">Height</p>
										<NumberFormat
											value={currentDBHeight}
											displayType="text"
											thousandSeparator={true}
											renderText={(value, props) => {
												return <p className="h-2 font-secondary-bold" {...props}>{value}</p>;
											}}/>
									</Card>
								</div>
								<div className="col-xl-3 col-md-6">
									<Card theme={1} icon={<UserIcon/>} color="blue">
										<p className="color-grey font-16 font-book">Validators</p>
										<p className="h-2 font-secondary-bold">{activeValidators.validators.length} / {data.length}</p>
									</Card>
								</div>
								<div className="col-xl-3 col-md-6">
									<Card theme={1} icon={<UnionIcon/>} color="orange">
										<p className="color-grey font-16 font-book">Bonded Tokens</p>
										<NumberFormat
											value={(parseInt(aggregated.totalVotingPower) / 10 ** coinConfig.exponent).toFixed(0)}
											displayType="text"
											thousandSeparator={true}
											renderText={(value, props) => {
												return <p className="h-2 font-secondary-bold" {...props}>{value}</p>;
											}}/>
									</Card>
								</div>
								<div className="col-xl-3 col-md-6">
									<Card theme={1} icon={<RepeatIcon/>} color="violet">
										<p className="color-grey font-16 font-book">Block Time</p>
										<p className="h-2 font-secondary-bold">{avgBlockTime} s</p>
									</Card>
								</div>
							</div>
							<div className="table-box">
								<div className="table">
									<div className="table-header">
										<div className="row">
											<div className="col-6">
												<div className="btns-group">
													<Button onClick={ () => {setActive(1)} } size="sm" color={active === 1 ? "blue" : undefined}>Active</Button>
													<Button onClick={ () => {setActive(0)}} size="sm" color={active === 0 ? "blue" : undefined}>Inactive</Button>
												</div>
											</div>
											<div className="col-lg-4 offset-lg-2 col-md-6">
												<Input search placeholder="Search Validator"/>
											</div>
										</div>
									</div>
									<table className="table table-large">
										<thead>
										<tr>
											<th>
												<div className="d-flex align-items-center">
													Rank
													<Dot>
														<SortIcon/>
													</Dot>
												</div>
											</th>
											<th>
												<div className="d-flex align-items-center">
													Validator
													<Dot>
														<SortIcon/>
													</Dot>
												</div>
											</th>
											<th>
												<div className="d-flex align-items-center">
													Voting Power
													<Dot>
														<SortIcon/>
													</Dot>
												</div>
											</th>
											<th>
												<div className="d-flex align-items-center">
													Cumulative Share %
													<Dot>
														<SortIcon/>
													</Dot>
												</div>
											</th>
											<th>
												<div className="d-flex align-items-center">
													Participation
													<Dot>
														<SortIcon/>
													</Dot>
												</div>
											</th>
											<th>
												<div className="d-flex align-items-center">
													Uptime
													<Dot>
														<SortIcon/>
													</Dot>
												</div>
											</th>
											<th>
												<div className="d-flex align-items-center">
													Commission
													<Dot>
														<SortIcon/>
													</Dot>
												</div>
											</th>
										</tr>
										</thead>
										<tbody>
										{
											validator_lists[active].map((validator, index) => (
												<tr key={index}>
													<td data-title="Rank">
														<span>{index + 1}</span>
													</td>
													<td data-title="Validator"> 
														<Link
															href={`${routes.public.validators}/${validator.operatorAddress}`}>
															<a>
																<div className="d-inline-flex align-items-center">
																	<div className="thumb size-30 position-left">
																		<Image src={process.env.API_SERVER + "validator/keybase/image/" + validator.description.identity}
																			width={30}
																			height={30}
																			alt={validator.description.moniker + " logo"}
																		   loading={"lazy"}
																		/>
																	</div>
																	<span className="font-14 font-secondary-bold">{validator.description.moniker}</span>
																</div>
															</a>
														</Link>
													</td>
													<td data-title="Voting Power">
														<NumberFormat
															value={(parseInt(validator.tokens) / 10 ** coinConfig.exponent).toFixed(0)}
															displayType="text"
															thousandSeparator={true}
															renderText={(value, props) => {
																return <p className="font-14 font-bold no-space" {...props}>{value}</p>;
															}}/>

														<p className="font-12 font-bold color-grey no-space">{(parseInt(validator.tokens) / aggregated.totalVotingPower * 100).toFixed(2)}%</p>
													</td>
													<td data-title="Cumulative Share %">
														<Progress value={(aggregated.cumulativeShare[index] / aggregated.totalVotingPower * 100).toFixed(2)}/>
													</td>
													<td data-title="Participation">
														<p className="status">
															<span className="font-12 color-grey font-bold">0 / 0</span>
														</p>
													</td>
													<td data-title="Uptime">
														<span className="font-bold">Soon</span>
													</td>
													<td data-title="Commission">
														<span className="font-bold">{ (parseInt(validator.commission.commissionRates.rate) / 10 ** 16).toFixed(2)}%</span>
													</td>
												</tr>
											))
										}
										</tbody>
									</table>

								</div>
							</div>
						</div>
			</>
		)
	}
	return <ErrorBlock/>;

}
